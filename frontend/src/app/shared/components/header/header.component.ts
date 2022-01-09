import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getUserData(str: string): string {
    return localStorage.getItem(str);
  }

  public onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  public getAvatarLink(): string {
    return PATH_CONFIG.AVATARS_URL.replace('{filename}', this.getUserData('avatar'));
  }
}
