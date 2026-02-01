import { Response } from "express";
import prisma from "../../../prisma/client";
import { AuthRequest } from "../../middlewares/auth.middleware";

/**
 * GET /tasks
 * Pagination + Filtering + Searching
 */
export const getTasks = async (req: AuthRequest, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  const where: any = {
    userId: req.user!.id,
    ...(status
      ? { completed: status === "completed" }
      : {}),
    ...(search
      ? { title: { contains: search, mode: "insensitive" } }
      : {}),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.count({ where }),
  ]);

  res.json({
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
};

/**
 * POST /tasks
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: req.user!.id,
    },
  });

  res.status(201).json(task);
};

/**
 * PATCH /tasks/:id/toggle
 */
export const toggleTask = async (req: AuthRequest, res: Response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: { completed: !task.completed },
  });

  res.json(updated);
};

/**
 * PATCH /tasks/:id
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: req.body,
  });

  res.json(updated);
};

/**
 * DELETE /tasks/:id
 */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await prisma.task.delete({
    where: { id: task.id },
  });

  res.status(204).send();
};
