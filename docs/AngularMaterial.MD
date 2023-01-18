#Angular Material

https://material.angular.io/

We are currently using 13, so when you go the documentation look in the upper right-hand corner of the page and make sure you are using the correct version.

>###CirrusMaterialModule
>We grouped most of the common Angular Material components into a single module and placed it in the UI Library and then exported it so that it could be added to each project's app.module.  There is some debate that this affects build size.  Also, without a doubt we are importing some components that are not being used. But it does add some convenience and cleaner import statements.  This could be technical debt, a chance for optimization.

##Components

The biggest reason we are using Angular Material is that it comes with prebuilt components such as menu, dialog, tabs, and toggle to name a few.

##CSS/SASS

Where there has been some difficulty has been the implementation of CSS/SASS/styling. Angular and Angular Material are very opinionated libraries. It comes with a lot of default styling that can be difficult to override. The benefit is that it saves time in implementation, and it provides stable proven components. However, it can be frustrating to implement unique/custom styling.

It is not simple to style an angular component, especially font/typography. The proper way to do that is with Angular Material's custom theming method. https://material.angular.io/guide/theming.

 We Have implemented that in both projects. In the recent-activity project the theming implementation can be found in styles.scss:
 ```scss
$primary: material.mat-define-palette($custom-palette);
$accent: material.mat-define-palette($custom-palette, A200, A100, A400);

$theme: material.mat-dark-theme(
    (
      color: (
      primary: $primary,
      accent: $accent,
    ),
  )
);

@include material.angular-material-theme($theme);
```

$custom-paletter can be found in apps/recent-activity/src/base-css/material-custom.scss
```scss
$white: white;

$custom-palette: (
  50: $white,
  100: $white,
  200: $white,
  300: $white,
  400: $white,
  500: $white,
  600: $white,
  700: $white,
  800: $white,
  900: $white,
  A100: $white,
  A200: $white,
  A400: $white,
  A700: $white,
  contrast: (
    50: $white,
    100: $white,
    200: $white,
    300: $white,
    400: $white,
    500: $white,
    600: $white,
    700: $white,
    800: $white,
    900: $white,
    A100: $white,
    A200: $white,
    A400: $white,
    A700: $white,
  ),
);
```

>__Again: this is the proper way to style the color of Angular Material Component Typography.  Trying to drill down Angular Material component tags and classes and create styling rules around them is hit and miss and not reliable.__

###Example: Changing Accent Color:

Had a recent story where I implemented a sliding toggle. I needed to change the base color when in the positive position. I modified the cirrus-ui-styles.scss file by adding an angular material palette (copy and paste -- could have imported it from the angular material palette file but wanted the code to be self documenting). Next I modified the $accent variable and which indirectly modifies the $theme variable via material.mat-dark-theme mixin.

```scss
$blue-palette: (
  50: #e3f2fd,
  100: #bbdefb,
  200: #90caf9,
  300: #64b5f6,
  400: #42a5f5,
  500: #2196f3,
  600: #1e88e5,
  700: #1976d2,
  800: #1565c0,
  900: #0d47a1,
  A100: #82b1ff,
  A200: #448aff,
  A400: #2979ff,
  A700: #2962ff,
  contrast: (
    50: $dark-primary-text,
    100: $dark-primary-text,
    200: $dark-primary-text,
    300: $dark-primary-text,
    400: $dark-primary-text,
    500: $light-primary-text,
    600: $light-primary-text,
    700: $light-primary-text,
    800: $light-primary-text,
    900: $light-primary-text,
    A100: $dark-primary-text,
    A200: $light-primary-text,
    A400: $light-primary-text,
    A700: $light-primary-text,
  ),
);

$custom-palette: (
  50: #e9e9e9,
  100: #c4c4c4,
  200: #989898,
  300: #595959,
  400: #1b1b1b,
  500: black,
  600: #757575,
  700: #616161,
  800: #1b1b1b,
  900: #212121,
  A100: #ffffff,
  A200: #ffffff,
  A400: #bdbdbd,
  A700: #616161,
  contrast: (
    50: $dark-primary-text,
    100: $dark-primary-text,
    200: $dark-primary-text,
    300: $dark-primary-text,
    400: $dark-primary-text,
    500: $dark-primary-text,
    600: $light-primary-text,
    700: $light-primary-text,
    800: $light-primary-text,
    900: $light-primary-text,
    A100: $dark-primary-text,
    A200: $dark-primary-text,
    A400: $dark-primary-text,
    A700: $light-primary-text,
  ),
);

$primary: material.mat-define-palette($custom-palette);
$accent: material.mat-define-palette($blue-palette, A200, A100, A400);

@include material.mat-core();

$theme: material.mat-dark-theme(
    (
      color: (
        primary: $primary,
        accent: $accent,
      ),
    )
);
```

The $theme variable is imported into the styles.scss file in the courses project:

```scss
/* You can add global styles to this file, and also import other style files */
@use '~@angular/material/theming' as material;
@use 'variables' as *;
@use 'fonts';
@use 'palette';

@use './app/app.component.scss-theme.scss' as app-component;

// @use 'cirrus-ui-module' as cirrus-ui;

@import 'cirrus-ui-styles';
@import '~@angular/cdk/overlay-prebuilt.css';

@include app-component.cirrus-app-component($theme);  // <<<< here it is >>>>
@import 'apps/recent-activity/src/base-scss/import';

```

##Custom Components: CDK Library
There are a couple components that are custom. One example is the Global Users Menu. This component required a lot of dev hours to complete, with some debugging. But it does realize the vision of the Cirrus Design and it is easier to implement custom styling and UX.

The documentation for the Angular CDK library can be found [here](https://material.angular.io/cdk/categories).


