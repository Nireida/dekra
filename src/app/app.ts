import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoaderService} from './services/load.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private loaderService = inject(LoaderService);
  isLoading = this.loaderService.isLoading;
}

