import fs from "fs";
import path from "path";
import { connectDB } from "./mongodb";
import { User, IUser } from "@/models/User";
import { Portfolio, IPortfolio } from "@/models/Portfolio";
import { createDefaultPortfolio, PortfolioDataType } from "./data";

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface StoredPortfolio {
  userId: string;
  username: string;
  data: PortfolioDataType;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "spartan_store.json");

function ensureFallbackStore(): { users: StoredUser[]; portfolios: Record<string, StoredPortfolio> } {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initial = { users: [], portfolios: {} };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const raw = fs.readFileSync(STORE_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { users: [], portfolios: {} };
  }
}

function saveFallbackStore(store: { users: StoredUser[]; portfolios: Record<string, StoredPortfolio> }) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save fallback store:", err);
  }
}

export const dbService = {
  async findUserByUsername(username: string): Promise<{ id: string; username: string; email: string; passwordHash: string } | null> {
    const cleanUsername = username.toLowerCase().trim();
    const mongo = await connectDB();
    if (mongo) {
      try {
        const u = await User.findOne({ username: cleanUsername }).lean<IUser>();
        if (u) {
          return {
            id: u._id.toString(),
            username: u.username,
            email: u.email,
            passwordHash: u.passwordHash,
          };
        }
      } catch (err) {
        console.warn("Mongoose findUserByUsername error:", err);
      }
    }

    // Fallback store
    const store = ensureFallbackStore();
    const found = store.users.find((u) => u.username === cleanUsername);
    return found || null;
  },

  async findUserByEmail(email: string): Promise<{ id: string; username: string; email: string; passwordHash: string } | null> {
    const cleanEmail = email.toLowerCase().trim();
    const mongo = await connectDB();
    if (mongo) {
      try {
        const u = await User.findOne({ email: cleanEmail }).lean<IUser>();
        if (u) {
          return {
            id: u._id.toString(),
            username: u.username,
            email: u.email,
            passwordHash: u.passwordHash,
          };
        }
      } catch (err) {
        console.warn("Mongoose findUserByEmail error:", err);
      }
    }

    // Fallback store
    const store = ensureFallbackStore();
    const found = store.users.find((u) => u.email === cleanEmail);
    return found || null;
  },

  async createUser(data: { username: string; email: string; passwordHash: string }): Promise<{ id: string; username: string; email: string }> {
    const cleanUsername = data.username.toLowerCase().trim();
    const cleanEmail = data.email.toLowerCase().trim();
    const mongo = await connectDB();

    let createdId = "";
    if (mongo) {
      try {
        const doc = await User.create({
          username: cleanUsername,
          email: cleanEmail,
          passwordHash: data.passwordHash,
        });
        createdId = doc._id.toString();

        // Create initial default portfolio for user in MongoDB
        const defaultPortfolio = createDefaultPortfolio(cleanUsername);
        await Portfolio.create({
          userId: doc._id,
          username: cleanUsername,
          hero: defaultPortfolio.hero,
          about: defaultPortfolio.about,
          skills: defaultPortfolio.skills,
          projects: defaultPortfolio.projects,
          experience: defaultPortfolio.experience,
          contact: defaultPortfolio.contact,
        });

        return { id: createdId, username: cleanUsername, email: cleanEmail };
      } catch (err) {
        console.warn("Mongoose createUser error, falling back:", err);
      }
    }

    // Fallback store
    const store = ensureFallbackStore();
    createdId = "usr_" + Math.random().toString(36).substring(2, 11);
    const newUser: StoredUser = {
      id: createdId,
      username: cleanUsername,
      email: cleanEmail,
      passwordHash: data.passwordHash,
      createdAt: new Date().toISOString(),
    };
    store.users.push(newUser);

    // Create default portfolio in fallback store
    const defaultData = createDefaultPortfolio(cleanUsername);
    store.portfolios[cleanUsername] = {
      userId: createdId,
      username: cleanUsername,
      data: defaultData,
      updatedAt: new Date().toISOString(),
    };
    saveFallbackStore(store);

    return { id: createdId, username: cleanUsername, email: cleanEmail };
  },

  async getPortfolio(username: string): Promise<PortfolioDataType | null> {
    const cleanUsername = username.toLowerCase().trim();
    const mongo = await connectDB();
    if (mongo) {
      try {
        const p = await Portfolio.findOne({ username: cleanUsername }).lean<IPortfolio>();
        if (p) {
          return {
            hero: p.hero,
            about: p.about,
            skills: p.skills,
            projects: p.projects,
            experience: p.experience,
            contact: p.contact,
          } as PortfolioDataType;
        }
      } catch (err) {
        console.warn("Mongoose getPortfolio error:", err);
      }
    }

    // Fallback store
    const store = ensureFallbackStore();
    const item = store.portfolios[cleanUsername];
    if (item) {
      return item.data;
    }

    return null;
  },

  async savePortfolio(username: string, userId: string, data: PortfolioDataType): Promise<boolean> {
    const cleanUsername = username.toLowerCase().trim();
    const mongo = await connectDB();
    if (mongo) {
      try {
        await Portfolio.findOneAndUpdate(
          { username: cleanUsername },
          {
            $set: {
              userId,
              username: cleanUsername,
              hero: data.hero,
              about: data.about,
              skills: data.skills,
              projects: data.projects,
              experience: data.experience,
              contact: data.contact,
              updatedAt: new Date(),
            },
          },
          { upsert: true, new: true }
        );
        return true;
      } catch (err) {
        console.warn("Mongoose savePortfolio error:", err);
      }
    }

    // Fallback store
    const store = ensureFallbackStore();
    store.portfolios[cleanUsername] = {
      userId,
      username: cleanUsername,
      data,
      updatedAt: new Date().toISOString(),
    };
    saveFallbackStore(store);
    return true;
  },
};
