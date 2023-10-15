import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> = new Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(private coursesService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    //this.coursesService = new CoursesService();
  }

  onAdd() {
    console.log(true);

    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.openDialog('Não foi possível carregar os dados');
          return of([])
        }),
      );
  }

  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
