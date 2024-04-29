CTC Admin
=================

This is an Angular project that utilizes NX Module Federation to modularize and share functionalities among different applications.

Running the Project
-------------------

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installing Dependencies

In the project root directory, run the following command to install all necessary dependencies:


`npm install`

### Initializing the Project

To start all applications (host and remotes) simultaneously, you can use the `nx serve` command. This will start all applications listed in host `project.json` and any necessary dependencies:


`nx serve ctc-admin`

### Accessing the Project

After starting the project, you can access it in the browser using the following URL:


`http://localhost:4204`

Building the Project
--------------------

To build the project for deployment, you can use the `nx build` command provided by NX. This will compile all applications and create deployment-ready packages. For example, to build the host application (`ctc-admin`), you can execute:


`nx build ctc-admin`

This will create the build files in the `dist/ctc-admin` folder.

To build a specific remote application, simply replace `ctc-admin` with the name of the desired remote application.

Creating a New Remote Application and Connecting it to the Host
---------------------------------------------------------------

To create a new remote application and automatically connect it to the host, you can use the following command:


`nx g @nrwl/angular:application name-of-new-remote-application --mfeType=remote --project=ctc-admin`

Replace `name-of-new-remote-application` with the desired name for the new remote application and `ctc-admin` with the name of the host project.

This command not only creates the new remote application but also automatically registers it in the `webpack.config.js` file of the host project, allowing the new remote application to be imported and used by the host.

Calling Components between Applications
---------------------------------------

To call components from a remote application in a host application, you can follow these steps:

1.  Export Components in the Remote Application:

    In the code of the remote application, make sure to export the components you want to use in other applications. This can be done by making the components public in the module of the remote application.

2.  Register Remote Applications:

    Remote applications need to be registered in the `remotes.d.ts` file so that TypeScript is aware of them. Add remote module declarations as below:


    `declare module 'name-of-new-remote-application/HeaderModule' {
      export const HeaderComponent: any;
    }`

    Replace `name-of-new-remote-application/HeaderModule` with the path to the module and desired component in the remote application.

3.  Import Components in the Host Application:

    In the code of the host application, you can import components from the remote application as needed. This can be done using the dynamic loading mechanism provided by NX Module Federation.


    `import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
    import { CommonModule } from '@angular/common';

    @Component({
      selector: 'app-shell-container',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './shell-container.component.html',
      styleUrl: './shell-container.component.scss',
    })
    export class ShellContainerComponent implements AfterViewInit {
      @ViewChild('ctcAdminHeader', { read: ViewContainerRef })
      headerViewContainer!: ViewContainerRef;
      @ViewChild('ctcAdminSidebar', { read: ViewContainerRef })
      sidebarViewContainer!: ViewContainerRef;

      ngAfterViewInit(): void {
        this.loadRemotes();
      }

      async loadRemotes(): Promise<void> {
        const mfeHeader = await import('header/Component');
        const mfeSidebar = await import('sidebar/Component');
        this.headerViewContainer.createComponent(mfeHeader.RemoteEntryComponent);
        this.sidebarViewContainer.createComponent(mfeSidebar.RemoteEntryComponent);
      }
    }`

    Replace `name-of-new-remote-application/HeaderModule` with the path to the module and desired component in the remote application.

4.  Use Imported Components:

    After importing components from the remote application, you can use them normally in your code as you would with any other Angular component.

Necessary Modifications
-----------------------

To add new features or make changes to the project, follow these steps:

1.  Create a New Remote Application:

    To add a new remote application, you can use the `nx generate` command provided by NX. For example:


    `nx generate @nrwl/angular:application new-remote-application`

2.  Register the New Remote Application in the Host:

    After creating the new remote application, you need to register it in the `webpack.config.js` file of the host application (`ctc-admin`). Add the module configuration of the new remote application to the `remotes` object in webpack.

3.  Import and Use the New Remote Application:

    In the code of the host application (`ctc-admin`), you can import and use the components or services provided by the new remote application as needed.

NX Module Federation
--------------------

NX Module Federation allows for the sharing of modules between different applications efficiently and without the need for code replication. This is achieved by defining remote applications that export specific modules and importing these modules into host applications. This promotes a modular architecture and facilitates maintenance and scalability of the project.

For more information about NX Module Federation, refer to the official documentation: [NX Module Federation](https://nx.dev/recipes/module-federation).