import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notifications/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent], // NotificationComponent importado correctamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnicaFlowww';
  notificationMessage: string | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notificationMessage$.subscribe((message: string | null) => {
      this.notificationMessage = message;
    });
  }
}
