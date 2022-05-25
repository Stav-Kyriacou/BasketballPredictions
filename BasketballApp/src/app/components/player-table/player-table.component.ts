import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/models/player/player';
import { PlayerService } from 'src/app/services/player.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Input } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { MatInput } from '@angular/material/input';
import { MatRadioChange } from '@angular/material/radio';

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
  @ViewChild(MatInput) filterInut: MatInput;

  columnsToDisplay: string[] = ['select', 'image', 'playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency'];
  largeRescolumnsToDisplay: string[] = ['select', 'image', 'playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency'];
  smallResColumnsToDisplay: string[] = ['select', 'image', 'playerName', 'efficiency'];
  filters: string[] = ['Name', 'Team', 'PTS', 'REB', 'BLK', 'STL', 'AST', 'FGM', 'FTM', 'EFF'];
  filter: string = this.filters[0];
  playerDataSource: MatTableDataSource<Player>;
  tableLoaded: boolean = false;
  playerList: Player[] = [];
  selection = new SelectionModel<Player>(true, []);

  constructor(private _playerService: PlayerService) { }

  ngOnInit(): void {
    if (!this.displayCheckbox) {
      this.columnsToDisplay.splice(0, 1);
      this.largeRescolumnsToDisplay.splice(0, 1);
      this.smallResColumnsToDisplay.splice(0, 1);
    }
  }

  setupTable(playerList: Player[]) {
    this.playerDataSource = new MatTableDataSource<Player>(playerList);
    this.playerDataSource.paginator = this.paginator;
    this.playerDataSource.filterPredicate = (data: Player, filter: string) => {
      return data.playerName.trim().toLowerCase().indexOf(filter) != -1;
    }
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

  onResize(event: ResizedEvent) {
    if (event.newRect.width < 690) {
      this.columnsToDisplay = this.smallResColumnsToDisplay
    } else {
      this.columnsToDisplay = this.largeRescolumnsToDisplay
    }
  }
  radioChanged(event: MatRadioChange): void {
    this.playerDataSource.filterPredicate = (data: Player, filter: string) => {
      var match;      

      switch (event.value) {
        case 'Name':
          match = data.playerName.trim().toLowerCase().indexOf(filter) != -1;
          break;
        case 'Team':
          match = data.team.trim().toLowerCase().indexOf(filter) != -1;
          break;
        case 'PTS':
          match = data.points == parseFloat(filter);
          break;
        case 'REB':
          match = data.rebounds == parseFloat(filter);
          break;
        case 'BLK':
          match = data.blocks == parseFloat(filter);
          break;
        case 'STL':
          match = data.steals == parseFloat(filter);
          break;
        case 'AST':
          match = data.assists == parseFloat(filter);
          break;
        case 'FGM':
          match = data.fieldGoalsMade == parseFloat(filter);
          break;
        case 'FTM':
          match = data.freeThrowsMade == parseFloat(filter);
          break;
        case 'EFF':
          match = data.efficiency == parseFloat(filter);
          break;
        default:
          break;
      }
      return match;
    }

    var filterValue = this.filterInut.value.trim().toLowerCase();
    if (filterValue.length > 0) {
      this.playerDataSource.filter = filterValue;

      if (this.playerDataSource.paginator) {
        this.playerDataSource.paginator.firstPage();
      }
    }
  }
}