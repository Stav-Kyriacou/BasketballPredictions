import { Component,ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/models/player/player';
import { PlayerService } from 'src/app/services/player.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Input } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {
  @Input() displayCheckbox: boolean;
  @Input() itemsPerPage: number[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay: string[] = ['select', 'image', 'playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency'];
  largeRescolumnsToDisplay: string[] = ['select','image','playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency'];
  smallResColumnsToDisplay: string[] = ['select','image','playerName', 'efficiency'];
  playerDataSource: MatTableDataSource<Player>;
  tableLoaded: boolean = false;
  playerList: Player[] = [];
  selection = new SelectionModel<Player>(true, []);

  constructor(private _playerService: PlayerService) { }

  ngOnInit(): void {
    if (!this.displayCheckbox) {
      this.columnsToDisplay = this.columnsToDisplay.slice(1, 12);
    }
  }

  setupTable(playerList: Player[]) {
    this.playerDataSource = new MatTableDataSource<Player>(playerList);
    this.playerDataSource.paginator = this.paginator;
    this.playerDataSource.sort = this.sort;
    this.tableLoaded = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.playerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.playerDataSource.paginator) {
      this.playerDataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.playerDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.playerDataSource.data);
  }

  onResize(event:ResizedEvent){
    if (event.newRect.width < 690) {
      this.columnsToDisplay = this.smallResColumnsToDisplay
    }else{
      this.columnsToDisplay = this.largeRescolumnsToDisplay}
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Player): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }
}
