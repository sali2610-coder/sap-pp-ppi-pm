# Chapter 8: SAP Fiori Launchpad Configuration

> Book: Configuring Plant Maintenance in SAP S/4HANA · pages 581–622 · 45 figures

## Figures

![SAP figure p.582 / איור עמ' 582](../images/ch8-p582-0.png)

![SAP figure p.583 / איור עמ' 583](../images/ch8-p583-1.png)

![SAP figure p.584 / איור עמ' 584](../images/ch8-p584-2.png)

![SAP figure p.585 / איור עמ' 585](../images/ch8-p585-3.png)

![SAP figure p.587 / איור עמ' 587](../images/ch8-p587-4.png)

![SAP figure p.589 / איור עמ' 589](../images/ch8-p589-5.png)

![SAP figure p.589 / איור עמ' 589](../images/ch8-p589-7.png)

![SAP figure p.590 / איור עמ' 590](../images/ch8-p590-8.png)

![SAP figure p.591 / איור עמ' 591](../images/ch8-p591-9.png)

![SAP figure p.591 / איור עמ' 591](../images/ch8-p591-10.png)

![SAP figure p.592 / איור עמ' 592](../images/ch8-p592-12.png)

![SAP figure p.593 / איור עמ' 593](../images/ch8-p593-13.png)

![SAP figure p.594 / איור עמ' 594](../images/ch8-p594-14.png)

![SAP figure p.594 / איור עמ' 594](../images/ch8-p594-15.png)

![SAP figure p.595 / איור עמ' 595](../images/ch8-p595-16.png)

![SAP figure p.596 / איור עמ' 596](../images/ch8-p596-17.png)

![SAP figure p.596 / איור עמ' 596](../images/ch8-p596-18.png)

![SAP figure p.597 / איור עמ' 597](../images/ch8-p597-19.png)

![SAP figure p.598 / איור עמ' 598](../images/ch8-p598-20.png)

![SAP figure p.599 / איור עמ' 599](../images/ch8-p599-21.png)

![SAP figure p.599 / איור עמ' 599](../images/ch8-p599-22.png)

![SAP figure p.600 / איור עמ' 600](../images/ch8-p600-23.png)

![SAP figure p.601 / איור עמ' 601](../images/ch8-p601-24.png)

![SAP figure p.601 / איור עמ' 601](../images/ch8-p601-26.png)

![SAP figure p.602 / איור עמ' 602](../images/ch8-p602-27.png)

![SAP figure p.602 / איור עמ' 602](../images/ch8-p602-29.png)

![SAP figure p.602 / איור עמ' 602](../images/ch8-p602-31.png)

![SAP figure p.603 / איור עמ' 603](../images/ch8-p603-32.png)

![SAP figure p.604 / איור עמ' 604](../images/ch8-p604-33.png)

![SAP figure p.604 / איור עמ' 604](../images/ch8-p604-34.png)

![SAP figure p.611 / איור עמ' 611](../images/ch8-p611-35.png)

![SAP figure p.612 / איור עמ' 612](../images/ch8-p612-36.png)

![SAP figure p.613 / איור עמ' 613](../images/ch8-p613-37.png)

![SAP figure p.613 / איור עמ' 613](../images/ch8-p613-38.png)

![SAP figure p.614 / איור עמ' 614](../images/ch8-p614-39.png)

![SAP figure p.614 / איור עמ' 614](../images/ch8-p614-40.png)

![SAP figure p.615 / איור עמ' 615](../images/ch8-p615-41.png)

![SAP figure p.616 / איור עמ' 616](../images/ch8-p616-42.png)

![SAP figure p.616 / איור עמ' 616](../images/ch8-p616-43.png)

![SAP figure p.617 / איור עמ' 617](../images/ch8-p617-45.png)

![SAP figure p.617 / איור עמ' 617](../images/ch8-p617-46.png)

![SAP figure p.618 / איור עמ' 618](../images/ch8-p618-48.png)

![SAP figure p.618 / איור עמ' 618](../images/ch8-p618-49.png)

![SAP figure p.619 / איור עמ' 619](../images/ch8-p619-50.png)

![SAP figure p.619 / איור עמ' 619](../images/ch8-p619-51.png)

## 8.1 Basics of SAP Fiori

8.1 Basics of SAP Fiori The number of SAP Fiori apps offered by SAP is growing rapidly, and the current vol- ume can be looked up in the SAP Fiori apps reference library (https://fioriappsli- brary.hana.ondemand.com). As of the time of writing, it shows about 15,000 SAP Fiori apps for SAP S/4HANA. In the Asset Management lines of business, there are approxi- mately 250 SAP Fiori apps, including many apps for project management, materials management, and quality management, which all have points of contact with plant maintenance (e.g., apps for inventory in embedded extended warehouse management [EWM] in SAP S/4HANA and for usage decisions in an inspection lot). There are about 50 SAP Fiori apps currently available for actual maintenance topics.

> _תרגום עברי בהכנה._

## 8.1.1 SAP Fiori Design

8.1.1 SAP Fiori Design SAP Fiori offers a frontend design with tiles that allow users to select functions and apps via the SAP Fiori launchpad (see Figure 8.1). Users may create their own My Home page out of tiles they are entitled to use like favorites in SAP GUI. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 582 Figure 8.1 SAP Fiori Launchpad: My Home If these functions or apps are clicked, the browser shows the screens of an SAPUI5 front- end. (Note that SAPUI5 is based on HTML5.)

> _תרגום עברי בהכנה._

## 8.1.2 Types of SAP Fiori Apps

8.1.2 Types of SAP Fiori Apps SAP Fiori apps can be classified three different ways (see Figure 8.2):  According to their content (the classification method preferred by SAP) Transactional apps, analytical apps, and fact sheet apps  According to their dynamism Static apps and dynamic apps (only listing apps)  According to their results Real apps with added value, real apps without added value, and pseudo apps Let’s now look at how we can classify SAP Fiori apps within each of these categories. Figure 8.2 Types of SAP Fiori Apps SAP Fiori Apps According Content According Dynamic According Result ▪ Transactional Apps ▪ Analytic Apps ▪ Fact Sheets ▪ Static Apps ▪ Dynamic Apps ▪ Real Apps with Added Value ▪ Real Apps without Added Value ▪ Pseudo Apps © 583 8.1 Basics of SAP Fiori Classifying SAP Fiori Apps Based on Their Content SAP prefers to classify apps according to their content. In this classification method, there are three different kinds of SAP Fiori apps (see Figure 8.3): 1 Transactional apps These apps execute certain business processes (e.g., creating a malfunction report, recording a confirmation), and they conform 1:1 to a transaction in SAP GUI. In addi- tion, a couple of functions can be combined in one app. 2 Fact sheet apps These apps provide the most important information about one object (e.g., supplier, material master, customer) within one screen display. 3 Analytical apps These apps can be used to produce evaluations, key figures, statistics, and diagrams for your business processes. Figure 8.3 SAP Fiori App Types: Content Based Classifying SAP Fiori Apps Based on Their Dynamism We can also classify SAP Fiori apps that issue lists by dividing them into static and dynamic apps, as follows:  Static apps These apps operate like list transactions in SAP GUI. You enter your selection crite- rion (e.g., a plant) in an upstream selection screen, and the list will show the relevant findings. If you want to change the selection criterion (e.g., to another plant or by adding a plant), you return to the selection screen, widen your selection, and subse- quently see the new (static) findings. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 584  Dynamic apps These apps show the filter area and findings in a list. If you change the filter, the find- ings are adjusted dynamically. Figure 8.4 shows the Find Technical Object app as an example of a dynamic app. Figure 8.4 SAP Fiori App: Find Technical Object Classifying SAP Fiori Apps Based on Their Results Finally, SAP Fiori apps can be classified according to their results, such as real SAP Fiori apps with added value, real SAP Fiori apps without added value, and pseudo-SAP Fiori apps. Let us first define real SAP Fiori apps with added value. In essence, these apps use SAPUI5 technology and add value relative to SAP GUI. Adding value can mean several things, including the following:  Extracting a single function out of a complex function. The Release Maintenance Orders app and the Approve Purchase Orders app do this.  Pooling a couple of transactions into just one. The Post Incoming Invoices app does this.  Providing functions that don’t exist in SAP GUI. Dynamic apps do this.  Preparing and consolidating statistics for graphic representation.  Showing key figures on the SAP Fiori tile (e.g., the number of maintenance notifica- tions). © 585 8.1 Basics of SAP Fiori By contrast, real SAP Fiori apps without added value use SAPUI5 technology but don’t provide any additional value by using it. See, for example, the Create Purchase Requisi- tion app, which uses SAP Fiori technology but doesn’t offer any added value compared to Transaction ME51N in SAP GUI. Pseudo SAP Fiori apps, however, are SAP Fiori apps that don’t use SAPUI5 and don’t deliver any additional value. See for example, the Overall Completion app, which doesn’t use SAPUI5 and only displays Transaction IW42 with a SAP GUI surface. There- fore, there is no additional user value.

> _תרגום עברי בהכנה._

## 8.1.3 Characteristics of SAP Fiori

8.1.3 Characteristics of SAP Fiori Value-adding apps basing on SAPUI5 facilitate users’ workload in the following ways:  The surface is responsive, which means it identifies the terminal device and access- ing data and aligns itself to the device.  The operation is coherent. In all apps, all functions and all devices of the operation are unified, and all processes share and are controlled by the same data.  Just like in SAP GUI, there is a role-based allocation. This is why each user will only find the specific functions personally assigned to him on his SAP Fiori launchpad.  Just like in SAP GUI, numerous possibilities for personalization are available (e.g., selection variants, field selection).  Each SAP Fiori app may be used on mobile devices, which enables users to access their data or tasks from anywhere at any time.  Provision is made for developing specific customer requirements, which means users may integrate their own self-developed apps within the SAP-provided devel- opment workbench (e.g., the SAP Business Application Studio, formerly known as the SAP Web IDE toolkit). Moreover, these characteristics of SAP Fiori are useful in day-to-day-business:  If it’s necessary or relevant, important key figures will be shown on the SAP Fiori launchpad (see Figure 8.5).  You can send emails (e.g., to send a list or a link to a document) from within each app.  All lists may be exported to Microsoft Office. Figure 8.5 SAP Fiori Launchpad: Tiles with Key Figures 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 586 On the other hand, in everyday business, some aspects of SAP Fiori can be rather off- putting:  SAPUI5 surfaces contain a lot of empty space, so they aren’t compact, which is also why screen pictures are needlessly big and blind.  Because SAP GUI uses tabstrips, information is assigned according to relevant head- lines and then allotted to tabstrips. This tabstrip technique isn’t available at HTML5, so in SAP Fiori, items of information are shown one below the other instead of in tabstrips. In many cases, this creates very long screens requiring a lot of scrolling to get the desired information.  Positioning of functional keys isn’t standardized yet.

> _תרגום עברי בהכנה._

## 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps

8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps This section explains the configuration of the SAP Fiori launchpad, which could be the single point of entry for users of the SAP S/4HANA system. This section supports your understanding of the role-based definition of users and the underlying SAP functional- ities. You’ll be shown how to define roles for users and how to integrate the standard Create Maintenance Request app for plant maintenance (see Figure 8.6). The key features of the SAP Fiori launchpad are as follows:  Maintenance requests for technical objects can be created, and the technical object may be a functional location or a piece of any equipment.  Barcodes can be scanned to enter the ID of the technical object.  A failure mode of the technical object can be assigned, and a maintenance request has to be prepared for it. Failure modes are maintained in Customizing function Maintain Catalogs (see Chapter 5, Section 5.1.2).  To indicate how a failure was discovered, a detection method can be assigned. Detec- tion methods are maintained in Customizing function Detection Methods (see Chapter 7, Section 7.9).  Effects for production can be attributed and are maintained in Customizing func- tion Define Operational Effects (see Chapter 5, Section 5.1.3).  Malfunction information (e.g., malfunction start date and time) can be entered.  A template can be used to deliver a detailed description of the maintenance request.  Priorities can be allocated and are maintained in Customizing function Define Prior- ities (see Chapter 5, Section 5.1.3). © 587 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps  A priority can be determined by using risk assessment and selecting a combination of consequence categories. These are consequences and likelihoods that use the Assess Priority functionality. Prioritization profiles are defined by using the Custo- mizing function Event Prioritization (see Chapter 7, Section 7.9).  It is possible to upload documents related to the maintenance request, and a link can be established to documents related to the maintenance request. Figure 8.6 SAP Fiori Create Maintenance Request App The process of configuring the SAP Fiori launchpad consists of eight steps, as shown in Figure 8.7. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 588 Figure 8.7 Eight Steps to Configure an SAP Fiori Launchpad with SAPUI5 Apps Transactions for the SAP Fiori Launchpad Before we start with the configuration, here’s an overview of the transactions you need for the SAP Fiori launchpad:  Transaction /UI2/FLP (Start SAP Fiori Launchpad)  Transaction /IWFND/MAINT_SERVICE (Activate OData Service)  Transaction /IWFND/V4_ADMIN (Activate OData Service Groups)  Transaction SICF (Activate ICF Services)  Transaction /UI2/FLPCM_CUST (Maintain Client-Specific Catalogs)  Transaction /UI2/FLPCM_CONF (Maintain Cross-Client Catalogs)  Transaction /UI2/FLPD_CUST (Start Launchpad Designer)  Transaction /UI2/FLPAM (SAP Fiori Launchpad App Manager)  Transaction PFCG (Maintain Roles)  Transaction SU01 (Maintain Users) Step 1: Check SAP System Data Step 2: Explore SAP Fiori App Library Step 3: Configure OData Services Step 4: Configure ICF Services Step 6: Create Launchpad Group Step 7: Create Role and Assign Authorizations Step 8: Initialize App Step 5: Create Launchpad Catalog (Optional) © 589 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps

> _תרגום עברי בהכנה._

## 8.2.1 Step 1: Check SAP System Data

8.2.1 Step 1: Check SAP System Data The relevant SAP system data can be found by choosing System • Status. A popup win- dow appears that shows an overview of your SAP system information (see Figure 8.8). Figure 8.8 SAP System Data Choose the icon in the SAP System data area to see Installed Software Component Versions (see Figure 8.9). Figure 8.9 Installed Software Component Versions You’ll have to find versions of the following components:  SAP_BASIS  SAP_UI  S4CORE  UIS4HOP1  UIAPFI70 (only if you want to implement finance apps) 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 590 Furthermore, you’ll have to look up these installed product versions (see Figure 8.10):  On-premise SAP S/4HANA (in this case, the 2023 initial shipment stack)  SAP Fiori for SAP S/4HANA (in this case, the 2023 initial shipment stack) Figure 8.10 Installed Product Versions

> _תרגום עברי בהכנה._

## 8.2.2 Step 2: Explore the SAP Fiori Apps Reference Library

8.2.2 Step 2: Explore the SAP Fiori Apps Reference Library To implement the Create Maintenance Request app, you retrieve some information about it in the SAP Fiori apps reference library by using the following link: https://fiori- appslibrary.hana.ondemand.com/sap/fix/externalViewer/#/home. On the resulting page, you’ll find information about the library, and you’ll also see the different app categories on the left (see Figure 8.11). Choose SAP Fiori apps for SAP S/4HANA and then All Apps or Lines of Business • Asset Management. There, you can search for the Create Maintenance Request app. After you locate the app, some important information will show up on the right-hand side of the screen (see Figure 8.12), as follows:  Required Back-End Product (SAP S/4HANA or SAP S/4HANA Cloud)  Application Type Transactional  Database HANA DB (exclusive)  Device Type(s) Desktop, Smartphone, Tablet (i.e., appropriate devices)  App ID F1511A © 591 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps Figure 8.11 SAP Fiori Apps Reference Library Figure 8.12 SAP Fiori App: Product Features 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 592 Navigate to the IMPLEMENTATION INFORMATION tab and ensure that the app is appro- priate for your system release. This can be checked in the dropdown menu shown in Figure 8.13. Figure 8.13 SAP Fiori App: Version Information In the example shown, the Create Maintenance Request app can be used in SAP S/4HANA releases from 2021 on, which fits the target system. Under Installation, you’ll see the necessary frontend and backend components (see Figure 8.14), so check whether the listed versions are compatible with your system and remember the infor- mation from step 1, where you checked the components. Figure 8.14 SAP Fiori App: Installation Information © 593 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps In the upper part of the Configuration screen, you’ll find the technical requirements that must be fulfilled by the backend system (see Figure 8.15). In this case, you must activate the following:  SAPUI5 Application EAM_WREQ_CRTS1 using Transaction SICF with Path to ICF Node /sap/bc/ui5_ui5/sap/eam_wreq_crts1  OData Service UI_MAINTWORKREQUESTOVW_V2 using Transaction /IFWND/MAINT_ SERVICE  OData V4 Service Group using Transaction /IWFND/V4_ADMIN Figure 8.15 SAP Fiori App: Configuration (1 of 2) In the lower part of the Configuration screen, you’ll find the catalogs and groups, which you can use to create your SAP Fiori launchpad (see Figure 8.16). In this case, you must activate the following:  SAP_TC_COMMON as the Technical Catalog  SAP_EAM_BC_MREQ_MNG as the Business Catalog  SAP_EAM_BCG_MREQ_MNG as the Business Group 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 594 Figure 8.16 SAP Fiori App: Configuration (2 of 2)

> _תרגום עברי בהכנה._

## 8.2.3 Step 3: Configure OData Services

8.2.3 Step 3: Configure OData Services Return to the backend system and activate the necessary OData services. Use Transac- tion /IFWND/MAINT_SERVICE to check if OData service UI_MAINTWORKREQUEST- OVW_V2 is already activated. If the OData service is activated (as shown in Figure 8.17), you don’t need to do anything else. Figure 8.17 OData Services © 595 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps If the OData service hasn’t yet been activated, you must import the OData service using the + Add Service button. On the next screen, enter the requested OData service name, and type in the System Alias as “LOCAL” (see Figure 8.18). Figure 8.18 Adding New OData Services Click the Get Services button to retrieve the requested OData services and mark the ser- vice that should be installed using the + Add Selected Services button. Here are the pos- sible outcomes:  If you try to install an OData service that is only available in a later release not yet implemented in your backend system, you’ll receive the No Backend Services Found error message.  If you try to install an OData service that is already implemented, you’ll receive the Backend Services Are Already Registered error message.  In all other cases, you should get the Service was created and its metadata was loaded successfully message (see Figure 8.19). Use Transaction /IFWND/V4_ADMIN to check whether the necessary OData Service Group UI_PRIORITIZATION_PROFILE is already activated. If the OData service is acti- vated, you don’t need to do anything else (see Figure 8.20). If the OData service group hasn’t yet been activated, you must import the OData ser- vice group using the Publish Service Groups button. The rest of the procedure is identi- cal to that for importing a single OData service. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 596 Figure 8.19 OData Service Installed Figure 8.20 OData Service Groups © 597 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps

> _תרגום עברי בהכנה._

## 8.2.4 Step 4: Configure ICF Services

8.2.4 Step 4: Configure ICF Services Start Transaction SICF, which will take you to the Define Services screen. In this trans- action, services are maintained (see Figure 8.21). Figure 8.21 Define ICF Services After installation of the SAP NetWeaver Application Server for ABAP (SAP NetWeaver AS for ABAP), all Internet Communication Framework (ICF) services are delivered inac- tive for security reasons. After the installation, you must decide which services should be activated manually. Because several services can be executed when a URL is entered, all service nodes must be activated in the Transaction SICF tree. To create and configure an ICF service, you usually perform the following steps: 1. Create the service. 2. Maintain the logon procedure. 3. Maintain service options. 4. Determine security requirements. 5. Set up the error pages. 6. Include request handlers. 7. Activate/deactivate service. In our case, we’ll create and activate the service for the Create Maintenance Request app by choosing the menu path /sap/bc/ui5_ui5/sap/eam_wreq_crts1 (see Figure 8.22). 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 598 Figure 8.22 Service for Create Maintenance Request App

> _תרגום עברי בהכנה._

## 8.2.5 Step 5: Create a Launchpad Catalog for the SAP Fiori Launchpad

8.2.5 Step 5: Create a Launchpad Catalog for the SAP Fiori Launchpad Creating a new launchpad catalog is not a must; it’s an optional step. You can also use the technical catalog or the business catalogs. A catalog is a set of apps that you can make available to a role. Depending on the role and the catalogs associated with the role, users can browse the catalogs and select the apps they want to view on the SAP Fiori launchpad homepage. A group is a subset of apps from one or more catalogs, and the tiles displayed on a user’s homepage depend on the groups associated with the user role. In addition, the user can personalize the homepage by predefining apps and adding or removing self-defined groups. All the tiles added are displayed in the group overview. There are two different transactions you can use to create a new business catalog:  Transaction /UI2/FLPCM_CUST (SAP Fiori Launchpad Content Manager Client- Specific)  Transaction /UI2/FLPCM_CONF (SAP Fiori Launchpad Content Manager Cross- Client) In our case, we want to create a new catalog for a client, so we use Transaction /UI2/FLP- CM_CUST. If you start the transaction, you get an overview of all existing catalogs (see Figure 8.23). © 599 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps Figure 8.23 SAP Launchpad Content Manager: Overview In our example, we want to create a new catalog for maintenance technicians in the Dallas plant. Therefore, we must click the Create button and enter the necessary details (see Figure 8.24). Figure 8.24 SAP Launchpad Content Manager: Create New Catalog Next, we must search for the technical catalog because the easiest way to assign con- tent to a new business group is to add tiles from the technical catalog. Therefore, we search for the SAP_TC_EAM_COMMON technical catalog (see Figure 8.25). 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 600 On the bottom, you see all tiles that are assigned to the technical catalog. If you want to assign tiles from the technical catalog to your new business catalog, mark the tiles and click the Add Tiles/Target Mappings button. Figure 8.25 SAP Launchpad Content Manager: Catalog with Tiles On the next screen, you search for your new business catalog (see Figure 8.26), and with the Add Tile/TM Reference button, you assign a tile reference to your new business cat- alog. © 601 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps Figure 8.26 SAP Launchpad Content Manager: Assigning Tiles to New Catalog

> _תרגום עברי בהכנה._

## 8.2.6 Step 6: Create a Business Group for the SAP Fiori Launchpad

8.2.6 Step 6: Create a Business Group for the SAP Fiori Launchpad The next step is to create a new business group, so you must start the SAP Fiori launch- pad designer using Transaction /UI2/FLPD_CUST or browser link https://myserver/sap/ bc/ui5_ui5/sap/arsrvc_upb_admn/main.html. Replace myserver with your own launch- pad server. The SAP Fiori launchpad designer is a client-specific SAP system, and the client (e.g., Client 201) is shown in the upper right-hand corner. The changes made in the SAP Fiori launchpad designer are distributed to other systems via transports, so a transport order must be assigned at the beginning of the configura- tion. In our case, the configuration shouldn’t be distributed to other systems because we only want to make local changes. To add a new group, you click on Groups and then click . We’ll now create a new group with apps for maintenance technicians in the Dallas plant (see Figure 8.27). By checking the Enable users to personalize their group box, you allow users to move apps to the group or delete them on their launchpad. You’ll get an empty screen like the one shown in Figure 8.28. Figure 8.27 SAP Fiori Launchpad Designer: New Group 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 602 Figure 8.28 SAP Fiori Launchpad Designer: New Group Initial Screen You add new tiles by clicking . On the next screen, you must search for your new business catalog (see Figure 8.29). Figure 8.29 SAP Fiori Launchpad Designer: Searching Catalog There, you can assign tiles to your new group by using the button (see Figure 8.30). Figure 8.30 SAP Fiori Launchpad Designer: Assigning Tiles to New Group © 603 8.2 How to Configure an SAP Fiori Launchpad with SAPUI5 Apps

> _תרגום עברי בהכנה._

## 8.2.7 Step 7: Create a Role and Assign Authorizations

8.2.7 Step 7: Create a Role and Assign Authorizations The authorization concept of SAP S/4HANA is role based. Roles are groups of related transactions, reports, web links, and apps that are used for the execution of certain tasks. You create a role and then assign it to a user or group of users who need the embedded functions to perform their daily business tasks. In our example, we are going to create a role for a maintenance technician in the Dallas plant. Roles are based on your company’s organizational plan, and they link the user with the appropriate permissions. Roles contain the structure and layout of a user’s menu and are defined as single roles with Transaction PFCG (Role Maintenance). Authorization profiles are generated from single roles and contain the individual authorization objects combined with authorization fields. Appendix A, Section A.2 contains a summary of authorization objects available in SAP S/4HANA Asset Management, as well as the organizational units, functions and fields that are checked in each use case. For our example, we’ll create a single role for a maintenance technician in the Dallas plant and assign the role to user KARL. The first step is to assign the Launchpad Catalog and the Launchpad Group on the Menu tab (see Figure 8.31). On the Authorizations tab, you configure the authorizations (see Figure 8.32). Figure 8.31 Single Role: Defining Launchpad Catalog and Launchpad Group 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 604 Figure 8.32 Single Role: Defining Authorizations On the User tab, you assign the role to one or more users.

> _תרגום עברי בהכנה._

## 8.2.8 Step 8: Initialize the App

8.2.8 Step 8: Initialize the App If a user starts the SAP Fiori launchpad, the new group appears (see Figure 8.33). Figure 8.33 SAP Fiori Launchpad with New Group © 605

> _תרגום עברי בהכנה._

## 8.3 Tabular Overview of All SAP Fiori Apps

8.3 Tabular Overview of All SAP Fiori Apps 8.3 Tabular Overview of All SAP Fiori Apps In Table 8.1 you’ll see a list of all available SAPUI5 apps for SAP S/4HANA Asset Manage- ment. To configure these for the SAP Fiori launchpad, you need information on the OData and ICF services. The list therefore contains the following information:  App ID and short text  Description  ICF nodes  OData services App Description ICF Nodes OData Services F1511 Request Main- tenance Request repairs to a technical object. /sap/bc/ui5_ui5/sap/ eam_ntf_cres1 /sap/bc/ui5_ui5/sap/ eam_ntf_reuses1 EAM_NTF_CREATE F2072 Find Technical Object View a list of techni- cal objects in your system. /sap/bc/ui5_ui5/sap/ eam_to_mans1 EAM_OBJPG_TECHNI- CALOBJECT_SRV F2021 Find Mainte- nance Notification Display a list of noti- fications, mass modi- fication of notifications. /sap/bc/ui5_ui5/sap/ eam_ntf_mans1 EAM_OBJPG_MAINT- NOTIFICATION_SRV F2175 Find Mainte- nance Order Display a list of orders, mass modifi- cation of messages. /sap/bc/ui5_ui5/sap/ eam_ord_mans1 EAM_OBJPG_MAINTE- NANCEORDER_SRV F2173 Find Mainte- nance Orders and Operations View a list of orders and related tasks, add time-by-time confirmations. /sap/bc/ui5_ui5/sap/ eam_ordop_mons1 EAM_OBJPG_MAIN- TORDANDOPER_SRV F2174 Find Mainte- nance Order Confir- mation View a list of order confirmations. /sap/bc/ui5_ui5/sap/ eam_oconf_mans1 EAM_OBJPG_ORDER- CONFIRMATION_SRV F2222 Manage Work Center Utilization Analyze and manage the utilization of your work centers. /sap/bc/ui5_ui5/sap/ rsh_eam_dets1 /sap/bc/ui5_ui5/sap/ rsh_eam_libs1 /sap/bc/ui5_ui5/sap/ rsh_eam_oplvls1 /sap/bc/ui5_ui5/sap/ rsh_eam_overvs1 RSH_EAM_ANALYZE_ SRV Table 8.1 SAP Fiori Apps 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 606 F2227 Resource Scheduling Monitor important key performance indicators (KPIs) for your work centers. /sap/bc/ui5_ui5/sap/ rsh_eam_overvs1 /sap/bc/ui5_ui5/sap/ rsh_eam_libs1 RSH_EAM_ANALYZE_ SRV F2774 Mass Schedule Maintenance Plans Schedule all mainte- nance plans due within a certain period. /sap/bc/ui5_ui5/sap/ nw_aps_apj /sap/bc/ui5_ui5/sap/ nw_aps_apj_lib APJ_JOB_MANAGE- MENT_SRV F2812 Analytical List Page for Technical Object Breakdown Analysis Analyze failures and calculate the dura- tion of breakdowns and repairs and time between repairs. /sap/bc/ui5_ui5/sap/ast- brkdwn_mons1 C_MAINTOBJBREAK- DOWNQUERY_CDS F2023 Report and Repair Malfunction Report a fault in a technical object, plan the necessary repair work, and document and carried-out actual times. /sap/bc/ui5_ui5/sap/ eam_malf_mans1 EAM_MALFUNCTION_ MANAGE F2465 Schedule Material Availability Check Perform material availability checks for various maintenance orders at runtime or schedule them as recurring batch jobs. /sap/bc/ui5_ui5/sap/ nw_aps_apj /sap/bc/ui5_ui5/sap/ nw_aps_apj_lib APJ_JOB_MANAGE- MENT_SRV F2412 Manage Teams and Responsi- bilities Manage teams and team members who take on specific tasks. /sap/bc/ui5_ui5/sap/ rsm_team_mans1 APS_CHANGE_DOCU- MENTS_SRV CA_RSM_TEAM_ ACTION_SRV CA_RSM_TEAM_SRV C_RESPYMG- MTTEAMHIERARCHY_ CDS F2603 Maintenance Scheduling Board Visualize orders, tasks, and subtasks in your workstations on a timeline. /sap/bc/ui5_ui5/sap/ rsh_eam_ordgts1 /sap/bc/ui5_ui5/sap/ rsh_eam_libs1 RSH_EAM_ORDER_ GANTT_SRV RSH_SB_MAINTE- NANCE_ORDER UI_RSHPERSON App Description ICF Nodes OData Services Table 8.1 SAP Fiori Apps (Cont.) © 607 8.3 Tabular Overview of All SAP Fiori Apps F2953 My Inbox - Maintenance Management Process your work- flow tasks via mobile or desktop devices. /sap/bc/ui5_ui5/sap/ca_ fiori_inbox /IWPGW/ TASKPROCESSING F3075 Technical Object Damages Display common damage and identify the parts of the tech- nical object that cause this damage, the number of causes, actions, and parts of the object. /sap/bc/ui5_ui5/sap/ astdmg_mons1 C_DAMAGEANALYSIS- QUERY_CDS F2828 Maintenance Planning Overview Display a list of criti- cal factors, such as missing spare parts or overdue orders; various cards illus- trate the results in numbers and colored charts. /sap/bc/ui5_ui5/sap/ eam_ord_mons1 /sap/bc/ui5_ui5/sap/ eam_po_mons1 /sap/bc/ui5_ui5/sap/ eam_procmts1 EAM_ORDER_ MONITOR F3065 Procurement for Maintenance Planners (Purchase Requisition) Display a list of all purchase requisi- tions that have been created for your maintenance orders. /sap/bc/ui5_ui5/sap/ eam_procmts /sap/bc/ui5_ui5/sap/ eam_ord_mons1 /sap/bc/ui5_ui5/sap/ eam_po_mons1 EAM_OBJPG_PURCH_ SRV F2827 Procurement for Maintenance Planners (Purchase Orders) Display a list of all purchase orders that have been created for your maintenance orders. /sap/bc/ui5_ui5/sap/ eam_po_mons1 /sap/bc/ui5_ui5/sap/ eam_ord_mons1 /sap/bc/ui5_ui5/sap/ eam_procmts1 EAM_OBJPG_ PURCHORDER_SRV F2660 Find Mainte- nance Task List Find and view main- tenance routing schedules. /sap/bc/ui5_ui5/sap/ eam_tl_mans1 EAM_OBJPG_TASK- LIST_SRV F2661 Find Mainte- nance Task List and Operation Find and view main- tenance routing and operations. /sap/bc/ui5_ui5/sap/ eam_tlop_mons1 EAM_OBJPG_TASK- LISTANDOP_SRV App Description ICF Nodes OData Services Table 8.1 SAP Fiori Apps (Cont.) 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 608 F3326 Manage Schedules Set up and monitor schedules for main- tenance order opera- tions. /sap/bc/ui5_ui5/sap/ rsh_eam_oplvls1 /sap/bc/ui5_ui5/sap/ rsh_eam_dets1 /sap/bc/ui5_ui5/sap/ rsh_eam_libs1 /sap/bc/ui5_ui5/sap/ rsh_eam_overvs1 RSH_EAM_MAINT_ SCHED_SIMULATION_ SRV F3622 Find Mainte- nance Plans Find and view main- tenance schedules. /sap/bc/ui5_ui5/sap/ eam_mplan_mans1 EAM_OBJPG_MAINT- PLAN_SRV F3567 Actual Mainte- nance Cost Analysis Analyze actual costs incurred by current orders from different perspectives. /sap/bc/ui5_ui5/sap/ eam_acost_mons1 EAM_ORDER_ACTUAL- COST_MONITOR F3925 Create Mass Time Confirmations View status of time confirmations and post them. /sap/bc/ui5_ui5/sap/ eam_oconf_crts1 /sap/bc/ui5_ui5/sap/ eam_ordop_mons1 EAM_ORD_MASS_ CONFIRMATION_SRV F5008 Find Mainte- nance Items Search for and dis- play maintenance items. /sap/bc/ui5_ui5/sap/ eam_mitem_mans1 EAM_OBJPG_MAINT- PLAN_SRV F4577 Manage Main- tenance Schedule for Assets Visualize mainte- nance windows and planned shutdowns. /sap/bc/ui5_ui5/sap/ rsh_eam_astbds1 /sap/bc/ui5_ui5/sap/ rsh_eam_libs1 RSH_EAM_MAINT_ ASSET_BOARD_SRV F5104A Perform Maintenance Jobs Review and execute all tasks scheduled for execution and report the actual data. /sap/bc/ui5_ui5/sap/ eam_pmntj_mans1 API_MAINTNOTIFICA- TION API_MAINTORDER- CONFIRMATION UI_MAINTENANCE- JOB_MANAGE F5147 Display Serial Numbers Display a list of serial numbers assigned to a material. /sap/bc/ui5_ui5/sap/ eam_serno_diss1 UI_MATERIALSERIAL- NUMBER App Description ICF Nodes OData Services Table 8.1 SAP Fiori Apps (Cont.) © 609 8.3 Tabular Overview of All SAP Fiori Apps F5105 Overview of Maintenance Backlog Overview Display information about maintenance worklists (requisi- tions and orders) for a specific planning book. /sap/bc/ui5_ui5/sap/ eam_bcklg_mons1 EAM_MAINT_PLAN- NER_OVERVIEW_SRV F1511A Create Main- tenance Request Create requirements. /sap/bc/ui5_ui5/sap/ eam_wreq_crts1 UI_MAINT- WORKREQUESTOVW_ V2 F4513 My Mainte- nance Requests View requests you’ve submitted. /sap/bc/ui5_ui5/sap/ eam_wreq_ovws1 UI_MAINT- WORKREQUESTOVW_ V2 F4072 Screen Main- tenance Requests Review and accept or reject requests. /sap/bc/ui5_ui5/sap/ eam_wreq_ovws1 UI_MAINT- WORKREQUESTOVW_ V2 F4604 Manage Main- tenance Notifications and Orders Manage notifica- tions and orders that are processed by stages. /sap/bc/ui5_ui5/sap/ eam_wrord_mans1 EAM_OBJPG_MAINTE- NANCEORDER_SRV EAM_OBJPG_MAINT- NOTIFICATION_SRV UI_MAINT- WORKREQUESTOVW_ V2 UI_MAINTWRKREQ_ ORD_MANAGE F3888 Manage Main- tenance Planning Buckets Create planning fold- ers to manage your worklist. /sap/bc/ui5_ui5/sap/ eam_bkt_mans1 EAM_PLNGBUCKET_ MANAGE F4073 Manage Main- tenance Backlog Manage orders that have been automati- cally assigned to a specific planning book. /sap/bc/ui5_ui5/sap/ eam_bl_mans1 /sap/bc/ui5_ui5/sap/ eam_bkt_mans1 EAM_BACKLOG_MAN- AGE F4603 Maintenance Order Costs Evaluate estimated, baseline, plan, and actual costs from cur- rent orders. /sap/bc/ui5_ui5/sap/ eam_pacst_mons1 UI_MAINTORD_PLN- ACTCOST App Description ICF Nodes OData Services Table 8.1 SAP Fiori Apps (Cont.) 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 610

> _תרגום עברי בהכנה._

## 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5

8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps As previously explained, you can use the apps predefined by SAP for the launchpad configuration. In addition to SAP Fiori SAPUI5 apps, you can add the following:  Web Dynpro apps  SAP GUI transactions As an example for a Web Dynpro app, we use Confirm Unplanned Job (app ID EAMS_ WDA_JOBUC_OIF; see Figure 8.34). Key features are as follows:  The app can be used for after-event recording. This means that the technician carries out the repair without an order and records the work carried out with actual data afterward.  Actual times can be confirmed. F4691 Create Work Permit Request Create a new work permit either inde- pendently or with reference to an exist- ing maintenance order or a prede- signed work permit template. /sap/bc/ui5_ui5/sap/ eam_wp_mans1 UI_WORKPERMIT F6065 Manage Work Packs Find existing work packs and send them to the output imme- diately or schedule the mass output. /sap/bc/ui5_ui5/sap/ eam_wrkpk_mans1 UI_MAINTJOBPCKG- BUILD_MNG F5325 Manage Main- tenance Plans Create, change, and schedule mainte- nance plans. /sap/bc/ui5_ui5/sap/ eam_mplanmans1 UI_MAINTENANCE_ PLAN F3556 Manage Main- tenance Items Create or change maintenance items. /sap/bc/ui5_ui5/sap/ EAM_MITEMMANS1 UI_MAINTENAN- CEITEM App Description ICF Nodes OData Services Table 8.1 SAP Fiori Apps (Cont.) © 611 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps  Materials issued can be confirmed.  Measurement or counter readings can be entered.  Malfunction data, damage codes, causes, and activity codes can be entered.  You end the entry by clicking Save and Complete. In the background, the system cre- ates a technically completed order with actual times, materials used, actual costs, and a completed notification. Figure 8.34 Web Dynpro Confirm Unplanned Job App As an example for an SAP GUI transaction, we use Transaction IH01 (Functional Loca- tion Structure List). The app shows the same as the original SAP GUI Transaction IH01 (app ID IH01), not with the locally installed SAP GUI but as an HTML GUI (see Figure 8.35). Configuring the SAP Fiori launchpad with non-SAPUI5 apps consists of the same eight steps as configuring the SAP Fiori launchpad with SAPUI5 apps shown in Figure 8.7. Therefore, in the following sections, we only describe the differences you’ll find when configuring the launchpad with non-SAPUI5 apps. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 612 Figure 8.35 SAP GUI Transaction IH01 Functional Location Structure List

> _תרגום עברי בהכנה._

## 8.4.1 Step 1: Check SAP System Data

8.4.1 Step 1: Check SAP System Data This is the same as described in Section 8.2.1.

> _תרגום עברי בהכנה._

## 8.4.2 Step 2: Browse the SAP Fiori Apps Reference Library

8.4.2 Step 2: Browse the SAP Fiori Apps Reference Library Now, you’ll retrieve information about the apps in the SAP Fiori apps reference library by using the following link: https://fioriappslibrary.hana.ondemand.com/sap/fix/exter- nalViewer/#/home. Search for “Confirm Unplanned Job.” You see that this app has Application Type Web Dynpro (see Figure 8.36). Search for term “IH01.” This app has Application Type SAP GUI (see Figure 8.37). Navigate to the IMPLEMENTATION INFORMATION tab. First, you’ll have to ensure that this app exists for your system release:  The Confirm Unplanned Job app is available for all SAP S/4HANA releases starting with 1809 FPS01.  The Functional Location Structure app is available for all SAP S/4HANA releases starting with 1610. Under Installation, you’ll find the necessary frontend and back- end components. Find out whether or not the listed versions are compatible with your system. © 613 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps Figure 8.36 SAP Fiori Apps Reference Library: Web Dynpro App Figure 8.37 SAP Fiori Apps Reference Library: SAP GUI Transaction 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 614 Under the Configuration paragraph, you’ll see all necessary information to set up the app. All Web Dynpro and SAP GUI apps for SAP S/4HANA Asset Management are listed in Technical Catalog SAP_TC_EAM_BE_APPS (see Figure 8.38). Figure 8.38 SAP Fiori Non-SAPUI5 App Configuration

> _תרגום עברי בהכנה._

## 8.4.3 Step 3: Configure OData Services

8.4.3 Step 3: Configure OData Services No OData services must be activated for the apps described.

> _תרגום עברי בהכנה._

## 8.4.4 Step 4: Configure ICF Services

8.4.4 Step 4: Configure ICF Services For these apps, the following ICF services must be activated:  Web Dynpro Application Confirm Unplanned Job: EAMS_WDA_JOBUC_OIF  SAP GUI Transaction IH01 (Functional Location Structure) An ICF service doesn’t need to be activated for any SAP GUI transaction. Start Transaction SICF, which will take you to the Define Services screen. In this trans- action, services are maintained (see Figure 8.39). Figure 8.39 Define Services © 615 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps In our case, we’ll create and activate the service for the Confirm Unplanned Job app by choosing the menu path /sap/bc/webdynpro/sap/EAMS_WDA_JOBUC_OIF (see Figure 8.40). Figure 8.40 Creating and Activating Service for Confirm Unplanned Job App

> _תרגום עברי בהכנה._

## 8.4.5 Step 5: Create a Business Catalog for the SAP Fiori Launchpad

8.4.5 Step 5: Create a Business Catalog for the SAP Fiori Launchpad Creating a new launchpad catalog is an optional step, but you may as well make use of the technical catalog or one of SAP’s business catalogs to create your own. To achieve this, two different transactions have to be made:  Transaction /UI2/FLPCM_CUST (SAP Fiori Launchpad Content Manager Client- Specific)  Transaction /UI2/FLPCM_CONF (SAP Fiori Launchpad Content Manager Cross- Client) In our case, we want to create a new catalog for a client. If you start Transaction /UI2/ FLPCM_CUST, you get an overview of all existing catalogs (see Figure 8.23). To extend our example further, we don’t want to create a new business catalog, but we want to expand the business catalog from Section 8.2.5 by including the two non- SAPUI5 apps. That is why we are looking for Technical Catalog SAP_TC_EAM_BE_APPS, which has the necessary two apps (see Figure 8.41). 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 616 Figure 8.41 SAP Launchpad Content Manager Technical Catalog At the bottom, you see all tiles assigned to the technical catalog. There are 328 non- SAPUI5 apps in Technical Catalog SAP_TC_EAM_BE_APPS, and there, we search for Transaction IH01 and Confirm Unplanned Job. If you want to attribute tiles from the technical catalog to your business catalog, mark the tiles and click the Add Tiles/Target Mappings button. On the next screen, you search for the business catalog (see Figure 8.42). By clicking the Add Tile/TM Reference button, you assign a tile reference to your new business catalog. Figure 8.42 SAP Launchpad Content Manager: Assigning Tiles to Catalog © 617 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps

> _תרגום עברי בהכנה._

## 8.4.6 Step 6: Create a Business Group for the SAP Fiori Launchpad

8.4.6 Step 6: Create a Business Group for the SAP Fiori Launchpad The next step brings us to creating a new business group. In our case, we want to extend the existing business group with the two non-SAPUI5 apps. Therefore, you start the SAP Fiori launchpad designer using https://myserver/sap/bc/ui5_ui5/sap/arsrvc_ upb_admn/main.html. Replace myserver with your own launchpad server. The SAP Fiori launchpad designer is a client-specific SAP system, and the client (Client 201) is shown in the upper right-hand corner. We look for our business group Z_DL_MAINTTECH (see Figure 8.43), and we add new tiles by clicking . Figure 8.43 SAP Fiori Launchpad Designer: Business Group On the next screen, you must find the relevant business catalog (see Figure 8.44). Figure 8.44 SAP Fiori Launchpad Designer: Searching Catalog There, you can assign tiles to your new group by using the button (see Figure 8.45). 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 618 Figure 8.45 SAP Fiori Launchpad Designer: Assigning Tiles to Business Group

> _תרגום עברי בהכנה._

## 8.4.7 Step 7: Create or Change a Role and Assign Authorizations

8.4.7 Step 7: Create or Change a Role and Assign Authorizations Keeping our example, we must reassign the Launchpad Catalog and the Launchpad Group on the Menu tab (see Figure 8.46). Figure 8.46 Single Role: Defining Catalog and Group On the Authorizations tab, we configure the authorizations (see Figure 8.47). © 619 8.4 How to Configure an SAP Fiori Launchpad with Non-SAPUI5 Apps Figure 8.47 Single Role: Defining Authorizations

> _תרגום עברי בהכנה._

## 8.4.8 Step 8: Initialize the App

8.4.8 Step 8: Initialize the App If we start our SAP Fiori launchpad, the newly added apps appear (see Figure 8.48). Figure 8.48 SAP Fiori Launchpad with New Apps Now, your SAP Fiori launchpad, including SAPUI5 and non-SAPUI5 apps, is ready to use. 8 Configuring the SAP Fiori Launchpad for Plant Maintenance 620

> _תרגום עברי בהכנה._

## 8.5 Tabular Overview of All Web Dynpro Apps

8.5 Tabular Overview of All Web Dynpro Apps In Table 8.2 you’ll see a list of all available Web Dynpro apps for SAP S/4HANA Asset Management. To configure these for the SAP launchpad, you need information on the ICF services. Therefore, the list contains the following information:  App ID and short text  Description  ICF nodes Short Text Description ICF Nodes /sap/bc/webdynpro/sap/... Asset Viewer Display complex object relation- ships (e.g., technical objects, materials, measurement docu- ments), navigation between objects, hierarchical structure display, and navigation. EAMS_WDA_NAV_OIF Confirm Unplanned Job After-event recording of actual times, consumed materials, and counter readings. EAMS_WDA_JOBUC_OIF Confirm Planned Job Recording of actual times, con- sumed materials, and counter readings. EAMS_WDA_JOBPC_OIF W0017 Process Maintenance Order Create, change, and display a maintenance order. EAMS_WDA_ORDNTF_OIF W0029 Process Technical Object Create, change, and display a technical object. EAMS_WDA_TECHOBJ_OIF W0003 Process Maintenance Notification Create, change, and display a maintenance notification. EAMS_WDA_ORDNTF_OIF W0023 Process Linear Reference Pattern Create, change, and display lin- ear patterns. EAML_WDA_LRP_OIF W0020 Confirm Jobs Create order confirmations. EAMS_WDA_CONF_OIF W0016 Display Job List Display a list of notifications, orders and operations, and print- ing job cards. EAMS_WDA_JOBLIST_OIF Table 8.2 Web Dynpro Apps © 621

> _תרגום עברי בהכנה._

## 8.6 Summary

8.6 Summary 8.6 Summary This chapter described various features of SAP Fiori apps and how to make use of them in an SAP Fiori launchpad. It covered these particular areas:  Some basic aspects of SAP Fiori, mainly different types of SAP Fiori apps (e.g., trans- actional apps that are categorized based on their content, SAPUI5 apps with added value that are categorized based on their results), as well as special characteristics of SAP Fiori apps (e.g., dynamic design, static design)  Step-by-step instructions on how to configure the SAP Fiori launchpad to allocate SAP Fiori apps based on SAPUI5 technology  Step-by-step instructions on how to configure the SAP Fiori launchpad to allocate SAP Fiori apps that are not based on SAPUI5 technology, namely SAP GUI apps and Web Dynpro apps  A tabular summary of all SAPUI5 apps, including information about how to config- ure them in the SAP Fiori launchpad  A tabular summary of all Web Dynpro apps, including information about how to configure them in the SAP Fiori launchpad  An explanation of the fact that SAP GUI apps don’t need any configuring prerequi- sites to include them in the SAP Fiori launchpad W0024 Display Maintenance Item Display a maintenance item and corresponding data (technical object, orders, etc.). EAMS_WDA_MPOS_OIF W0009 Process Maintenance Plan Create, change, and display maintenance plans. EAMS_WDA_MPLAN_OIF_V2 W0031 Process Measuring Point Create, change, and display mea- suring points. EAMS_WDA_MP_OIF W0013 Process Measuring Documents Create, change, and display mea- suring documents. EAMS_WDA_MD_OIF W0021 Process Task List Create, change, and display maintenance task lists. EAMS_WDA_TL_OIF_V2 W0192 Maintenance Plan Scheduling Overview View maintenance plan schedul- ing details. FPM_BICS_OVP Short Text Description ICF Nodes /sap/bc/webdynpro/sap/... Table 8.2 Web Dynpro Apps (Cont.) ©

> _תרגום עברי בהכנה._


---
Source: Configuring Plant Maintenance in SAP S/4HANA pp.581-622
