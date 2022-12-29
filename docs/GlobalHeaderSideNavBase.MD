# Global Header/SideNav and the CirrusBaseComponent.
Navigating between the legacy FE, Courses and Recent Activity we wanted to maintain consistency for the user and the developer.  First we created a global header sidenav component. This is located at cirrus/libs/sidenav-header/src/lib/global-side-nav/global-side-nav.component.ts.


```angular2html

<div class="main-container">
  <div>

<!--    start global header-->

    <cirrus-global-header
      [cirrusUser]="(cirrusUser$ | async)!"
      [cirrusImpersonationReturnUser]="(cirrusImpersonateReturnUser$ | async)!"
      [notificationCount]="(notificationCount$ | async)!"
      (logout)="logout()"
      (impersonationLogout)="impersonationLogout()"
      [isScreenSmall]="(isScreenSmall$ | async)!"
      [deployUrl]="'recent-activity'"
      [orderCount]="(myOrdersCount$ | async)!"
      (toggleNotificationsMenu)="toggleNotificationsMenu()"
    ></cirrus-global-header>

<!--    end global header-->

  </div>
  <main class="">
    <div class="main-content-wrapper">
      <div class="sidenav-wrapper" *ngIf="(isScreenSmall$ | async) === false">

<!--        start global sidenav-->

        <cirrus-global-side-nav
          [cirrusUser]="(cirrusUser$ | async)!"
          (emitCollapse)="toggleCollapse($event)"
          [notificationCount]="(notificationCount$ | async)!"
          (toggleNotificationsMenu)="toggleNotificationsMenu()"
          [deployUrl]="'recent-activity'"
        ></cirrus-global-side-nav>

<!--        end global sidenav-->

      </div>
      <div
        class="content-container"
        [ngClass]="collapse ? 'sidenav-collapsed' : 'sidenav-expanded'"
      >
        <div *ngIf="error$ | async" class="error-container">
          <cirrus-error-notification
            [calledFromWhatMfe]="project"
            (emitClose)="dismissErrorMessage()"
          ></cirrus-error-notification>
        </div>

        <div
          class="router-outlet-wrapper"
          [ngClass]="
            (isNotificationMenuOpen$ | async) ? 'notifications-menu-active' : ''
          "
          #outletContainer
        >
          <router-outlet>

          </router-outlet>
          <cirrus-global-footer></cirrus-global-footer>
        </div>
      </div>



    </div>
  </main>

</div>

```
Since so many of these variables were required and therefore redundant we made a [base component](https://github.com/cirrusaircraft/cirrus-lms-fe-mono/blob/master/libs/ui/src/lib/cirrus-base/CirrusBase.component.ts) for the app.components of both projects to inherit.

```typescript
@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  extends CirrusBaseComponent // <----- extends base component
  implements OnInit, OnDestroy
{
  // code
}
```
## BaseComponent: Composition a better choice?
Perhaps. It is possible that all these variables and services could be aggregated into a single service and then injected through the constructor.

## Instructor Experience
We will need to create an Instructor Experience MFE and that will require a new app.component that will extend the BaseComponent and will have the global side nav and global header declared in the app.component.html.

## Further Abstraction.
