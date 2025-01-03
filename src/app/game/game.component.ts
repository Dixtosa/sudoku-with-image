import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PuzzlesDatabase } from '../puzzles-db'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit {

  selectedNumber: number | undefined;

  board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  boardWithImages: (string | null)[][] = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  availableImages: string[][] = [
    [], [], [], [], [], [], [], [], []
  ];

  // A method to handle user input and update the board
  handleInput(row: number, col: number, value: number): void {
    debugger;
    if (value >= 1 && value <= 9) {
      this.board[row][col] = value;
    }
  }

  // A simple check to validate the Sudoku solution
  validateBoard(): boolean {
    // Check rows
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set<number>();
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] !== 0) {
          if (rowSet.has(this.board[i][j])) {
            return false; // Duplicate in row
          }
          rowSet.add(this.board[i][j]);
        }
      }
    }

    // Check columns
    for (let j = 0; j < 9; j++) {
      const colSet = new Set<number>();
      for (let i = 0; i < 9; i++) {
        if (this.board[i][j] !== 0) {
          if (colSet.has(this.board[i][j])) {
            return false; // Duplicate in column
          }
          colSet.add(this.board[i][j]);
        }
      }
    }

    // Check 3x3 grids
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const gridSet = new Set<number>();
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            const value = this.board[i + x][j + y];
            if (value !== 0) {
              if (gridSet.has(value)) {
                return false; // Duplicate in 3x3 grid
              }
              gridSet.add(value);
            }
          }
        }
      }
    }

    return true;
  }

  // Initialize the board with an example Sudoku puzzle (for testing)
  ngOnInit(): void {
    var puzzle = new PuzzlesDatabase().getEasy();
    this.board = puzzle.board;
    this.fillAvailableImages();
    this.initializeBoardWithImages();
  }
  fillAvailableImages() {
    for (let i = 0; i < this.availableImages.length; i++) {
      const number = this.availableImages[i];
      for (let j = 0; j < 9; j++) {
        number.push((i + 1) + "/" + (j + 1));
      }
    }
  }
  initializeBoardWithImages() {
    for (let i = 0; i < this.boardWithImages.length; i++) {
      const row = this.boardWithImages[i];
      for (let j = 0; j < row.length; j++) {
        if (this.board[i][j] != 0) {
          this.boardWithImages[i][j] = this.availableImages[this.board[i][j] - 1][0];
          this.availableImages[this.board[i][j] - 1].shift();
        }
      }
    }
  }
}