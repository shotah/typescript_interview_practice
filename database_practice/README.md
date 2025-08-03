# Database Practice

Master database fundamentals, SQL queries, and modern ORMs for interviews.

## 🚀 Quick Setup with Docker

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js 18+ for running the examples

### One-Command Setup
```bash
cd database_practice

# Start all databases (PostgreSQL, MySQL, Redis + Adminer)
npm run db:up

# Check that everything is running
npm run db:status

# Access database admin panel
npm run admin
# Opens Adminer at http://localhost:8080
```

### Connection Details
```bash
# PostgreSQL (Port 5432)
Server: postgres
Username: practice_user  
Password: practice_password
Database: practice_db

# MySQL (Port 3306)
Server: mysql
Username: practice_user
Password: practice_password  
Database: practice_db

# Redis (Port 6379) - No auth needed
# Adminer (Port 8080) - Web interface for databases
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# All connection strings are pre-configured!
```

### Alternative: SQLite (No Docker Needed)
```bash
mkdir sqlite-practice
cd sqlite-practice
npm init -y
npm install prisma @prisma/client sqlite3 typescript ts-node @types/node --save-dev
npx prisma init --datasource-provider sqlite
```

## 📊 Database Fundamentals

### SQL Interview Essentials
```sql
-- Basic CRUD Operations
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

SELECT * FROM users WHERE email LIKE '%@example.com';

UPDATE users SET name = 'Jane Doe' WHERE id = 1;

DELETE FROM users WHERE id = 1;

-- Joins (Common Interview Topic)
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inner Join
SELECT u.name, p.title 
FROM users u 
INNER JOIN posts p ON u.id = p.user_id;

-- Left Join (show users without posts too)
SELECT u.name, p.title 
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id;

-- Aggregations
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;
```

## 🔶 Prisma ORM (Modern Choice)

### Docker + Prisma Setup  
```bash
# 1. Start databases
npm run db:up

# 2. Set up Prisma project
npm run setup:prisma

# 3. Run Prisma Studio (database browser)
cd prisma-example && npx prisma studio
```

### Manual Prisma Setup
```bash
mkdir prisma-example && cd prisma-example
npm init -y
npm install prisma @prisma/client typescript ts-node @types/node --save-dev

# Initialize with PostgreSQL
npx prisma init --datasource-provider postgresql

# Generate client and push schema
npx prisma generate
npx prisma db push

# Open database browser
npx prisma studio
```

### Schema Definition
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique

  @@map("profiles")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]

  @@map("tags")
}
```

### TypeScript Usage
```typescript
// src/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// User CRUD Operations
export const userService = {
  // Create user with profile
  async createUser(data: { name: string; email: string; bio?: string }) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        profile: data.bio ? {
          create: { bio: data.bio }
        } : undefined
      },
      include: {
        profile: true,
        posts: true
      }
    });
  },

  // Get users with post count
  async getUsersWithPostCount() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: { posts: true }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      }
    });
  },

  // Complex query with filtering
  async searchUsers(searchTerm: string) {
    return await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { posts: { some: { title: { contains: searchTerm, mode: 'insensitive' } } } }
        ]
      },
      include: {
        posts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' },
          take: 3
        },
        profile: true
      }
    });
  },

  // Transaction example
  async transferPostOwnership(fromUserId: number, toUserId: number, postId: number) {
    return await prisma.$transaction(async (tx) => {
      // Verify source user owns the post
      const post = await tx.post.findFirst({
        where: { id: postId, authorId: fromUserId }
      });
      
      if (!post) {
        throw new Error('Post not found or not owned by source user');
      }

      // Transfer ownership
      return await tx.post.update({
        where: { id: postId },
        data: { authorId: toUserId },
        include: { author: true }
      });
    });
  }
};

// Clean up
export async function cleanup() {
  await prisma.$disconnect();
}
```

## 🗃️ TypeORM (Enterprise Choice)

### Docker + TypeORM Setup
```bash
# 1. Start databases  
npm run db:up

# 2. Set up TypeORM project
npm run setup:typeorm

# 3. Run development server
npm run dev:typeorm
```

### Manual TypeORM Setup  
```typescript
// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'practice_user',
  password: process.env.POSTGRES_PASSWORD || 'practice_password',
  database: process.env.POSTGRES_DATABASE || 'practice_db',
  synchronize: true, // Don't use in production
  logging: true,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});
```

### Entity Definitions
```typescript
// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// src/entities/Post.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Repository Pattern Usage
```typescript
// src/services/UserService.ts
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Post } from '../entities/Post';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private postRepository = AppDataSource.getRepository(Post);

  async createUser(userData: { name: string; email: string; bio?: string }): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getUserWithPosts(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
      order: {
        posts: {
          createdAt: 'DESC'
        }
      }
    });
  }

  async getUsersWithPostCount(): Promise<Array<User & { postCount: number }>> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .loadRelationCountAndMap('user.postCount', 'user.posts')
      .orderBy('user.postCount', 'DESC')
      .getMany() as Array<User & { postCount: number }>;
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.name ILIKE :search', { search: `%${searchTerm}%` })
      .orWhere('user.email ILIKE :search', { search: `%${searchTerm}%` })
      .orWhere('post.title ILIKE :search', { search: `%${searchTerm}%` })
      .getMany();
  }

  async transferPostOwnership(fromUserId: number, toUserId: number, postId: number): Promise<Post> {
    return await AppDataSource.transaction(async manager => {
      const post = await manager.findOne(Post, {
        where: { id: postId, author: { id: fromUserId } },
        relations: ['author']
      });

      if (!post) {
        throw new Error('Post not found or not owned by source user');
      }

      post.author = await manager.findOneByOrFail(User, { id: toUserId });
      return await manager.save(post);
    });
  }
}
```

## 📝 Raw SQL with TypeScript

### PostgreSQL Example (with Docker)
```typescript
// src/raw-sql-example.ts
import { Client } from 'pg';

class DatabaseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'practice_user',
      password: process.env.POSTGRES_PASSWORD || 'practice_password',
      database: process.env.POSTGRES_DATABASE || 'practice_db',
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async createUser(name: string, email: string): Promise<number> {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id';
    const result = await this.client.query(query, [name, email]);
    return result.rows[0].id;
  }

  async getUserWithPosts(userId: number): Promise<any> {
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await this.client.query(userQuery, [userId]);
    
    if (userResult.rows.length === 0) return null;

    const postsQuery = 'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC';
    const postsResult = await this.client.query(postsQuery, [userId]);

    return {
      ...userResult.rows[0],
      posts: postsResult.rows
    };
  }

  async getUsersWithPostCount(): Promise<any[]> {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(p.id) as post_count
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id, u.name, u.email
      ORDER BY post_count DESC
    `;
    const result = await this.client.query(query);
    return result.rows;
  }

  async searchUsers(searchTerm: string): Promise<any[]> {
    const query = `
      SELECT DISTINCT
        u.id,
        u.name,
        u.email
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      WHERE u.name ILIKE $1 
         OR u.email ILIKE $1
         OR p.title ILIKE $1
    `;
    const result = await this.client.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }
}

// Usage example
async function example() {
  const db = new DatabaseService();
  await db.connect();

  try {
    // Create users
    const userId1 = await db.createUser('John Doe', 'john@example.com');
    const userId2 = await db.createUser('Jane Smith', 'jane@example.com');

    // Get user with posts
    const userWithPosts = await db.getUserWithPosts(userId1);
    console.log(userWithPosts);

    // Search users
    const searchResults = await db.searchUsers('john');
    console.log(searchResults);
  } finally {
    await db.disconnect();
  }
}
```

### SQLite Example (No Docker)
```typescript
// src/sqlite-example.ts
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class SQLiteService {
  private db: sqlite3.Database;

  constructor(dbPath: string = ':memory:') {
    this.db = new sqlite3.Database(dbPath);
  }

  private run = promisify(this.db.run.bind(this.db));
  private get = promisify(this.db.get.bind(this.db));
  private all = promisify(this.db.all.bind(this.db));

  async init(): Promise<void> {
    await this.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await this.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        user_id INTEGER,
        published BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }

  async createUser(name: string, email: string): Promise<number> {
    const result = await this.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return (result as any).lastID;
  }

  async getUserWithPosts(userId: number): Promise<any> {
    const user = await this.get(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!user) return null;

    const posts = await this.all(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    return { ...user, posts };
  }

  async getUsersWithPostCount(): Promise<any[]> {
    return await this.all(`
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(p.id) as post_count
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id, u.name, u.email
      ORDER BY post_count DESC
    `);
  }

  async searchUsers(searchTerm: string): Promise<any[]> {
    return await this.all(`
      SELECT DISTINCT
        u.id,
        u.name,
        u.email
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      WHERE u.name LIKE ? 
         OR u.email LIKE ?
         OR p.title LIKE ?
    `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
  }

  close(): void {
    this.db.close();
  }
}
```

## 🛠️ Database Management Commands

### Docker Database Management
```bash
# Start all databases
npm run db:up

# Stop all databases  
npm run db:down

# Restart databases
npm run db:restart

# View logs
npm run db:logs

# Clean everything (removes data!)
npm run db:clean

# Check status
npm run db:status
```

### Direct Database Access
```bash
# Connect to PostgreSQL
npm run db:postgres

# Connect to MySQL  
npm run db:mysql

# Connect to Redis
npm run db:redis

# Open Adminer (web interface)
npm run admin
```

### Example Queries to Try
```sql
-- PostgreSQL examples
SELECT u.name, COUNT(p.id) as post_count 
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id 
GROUP BY u.id, u.name 
ORDER BY post_count DESC;

-- MySQL examples  
SELECT 
  c.first_name, 
  c.last_name, 
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total_amount), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.first_name, c.last_name
ORDER BY total_spent DESC;
```
```

## 🧠 Database Interview Questions

### **Q: What's the difference between SQL and NoSQL?**
- **SQL**: Structured, ACID, relations, complex queries
- **NoSQL**: Flexible schema, horizontal scaling, eventual consistency

### **Q: Explain database normalization**
- **1NF**: Atomic values, no repeating groups
- **2NF**: No partial dependencies on composite keys
- **3NF**: No transitive dependencies

### **Q: What are database indexes?**
- Speed up queries by creating sorted references
- Trade-off: Faster reads, slower writes
- Types: B-tree, Hash, Bitmap

### **Q: INNER JOIN vs LEFT JOIN?**
- **INNER**: Only matching records from both tables
- **LEFT**: All records from left table, matched from right

### **Q: What are database transactions?**
- **ACID**: Atomicity, Consistency, Isolation, Durability
- **Rollback**: Undo changes if error occurs

## 🎯 Practice Exercises

### Beginner Level
1. **User CRUD** - Create, read, update, delete users
2. **Simple Queries** - Filter, sort, and limit results
3. **Basic Joins** - User posts and comments

### Intermediate Level  
4. **Blog Platform** - Posts, comments, tags with many-to-many relationships
5. **E-commerce** - Products, orders, inventory management
6. **Aggregations** - Count, sum, average queries with GROUP BY

### Advanced Level
7. **Social Media** - Users, posts, likes, follows with complex queries
8. **Performance Optimization** - Indexes, query optimization
9. **Real-time Chat** - Messages, rooms, online users

### Database-Specific Practice
- **PostgreSQL**: Use JSON columns, full-text search, window functions
- **MySQL**: Practice with different storage engines, partitioning
- **Redis**: Caching strategies, pub/sub, data structures

## 🔗 Resources

- [Prisma Docs](https://www.prisma.io/docs/)
- [TypeORM Docs](https://typeorm.io/)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Database Design](https://www.lucidchart.com/pages/database-diagram/database-design)
- [SQL Practice](https://www.hackerrank.com/domains/sql)