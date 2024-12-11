import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  boardWithImages: number[][] = [
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
    this.board = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
  }
}