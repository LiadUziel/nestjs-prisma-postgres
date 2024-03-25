import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all notes from the database.
   * @returns An array of all notes.
   */
  async getAllNotes(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  /**
   * Retrieves a single note by its ID.
   * @param id The ID of the note to retrieve.
   * @throws NotFoundException if no note is found with the provided ID.
   * @returns The note with the specified ID.
   */
  async getNoteById(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }

    return note;
  }

  /**
   * Creates a new note in the database.
   * @param data The data used to create the note.
   * @returns The created note.
   */
  async create(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({
      data,
    });
  }

  /**
   * Updates an existing note.
   * @param id The ID of the note to update.
   * @param data The data to update the note with.
   * @returns The updated note.
   */
  async update(id: number, data: Prisma.NoteUpdateInput): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a note by its ID.
   * @param id The ID of the note to delete.
   * @throws NotFoundException if no note is found with the provided ID.
   * @returns The deleted note.
   */
  async delete(id: number): Promise<Note> {
    try {
      return await this.prisma.note.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Note with ID ${id} not found.`);
      } else {
        throw error;
      }
    }
  }
}
