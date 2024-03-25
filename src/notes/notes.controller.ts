import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Note } from '@prisma/client';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto'; // Assume this exists for the example

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get All Notes',
    description: 'Retrieve a list of all notes.',
  })
  @ApiResponse({ status: 200, description: 'Return a list of notes.' })
  async getAllNotes() {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Note By ID',
    description: 'Retrieve a single note by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the note to retrieve' })
  @ApiResponse({ status: 200, description: 'Return a single note by ID.' })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  async getNoteById(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.getNoteById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Note', description: 'Create a new note.' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({
    status: 201,
    description: 'The note has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Note',
    description: 'Update an existing note.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the note to update' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({
    status: 200,
    description: 'The note has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Note',
    description: 'Delete an existing note by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the note to delete' })
  @ApiResponse({
    status: 200,
    description: 'The note has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.delete(id);
  }
}
