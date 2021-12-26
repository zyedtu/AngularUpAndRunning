                                  # Routing in Angular #

Dans ce chapitre, nous traiterons d'une autre exigence courante des applications Web, qui consiste à encapsuler diverses pages et éléments sous différentes routes, et à pouvoir pour créer des liens profonds avec eux en cas de besoin. Nous allons implémenter le module de routage intégré d'Angular. En outre, nous verrons également comment sécuriser notre application à l'aide d'Auth Guards et d'autres fonctionnalités du routeur.     
# Configuration du routage angulaire (Setting Up Angular Routing):   
De même, au lieu de passer du temps à créer tous les composants pour les routes restantes et à revoir les concepts que nous avons déjà traités dans le chapitre 04, nous utiliserons plutôt l'application Angular de base précodée qui contient quelques composants supplémentaires. Si vous prévoyez de continuer à coder, notez les ajouts suivants et assurez-vous de les ajouter à votre application.    

Je crée un nouveaux composant avec angular Cli:   

    > ng g c user/login
Ensuite j'ajoute le service user

    > ng g s /services/user
### Importation du module routeur (Importing the Router Module):   
Une fois toute la configuration terminée, nous pouvons maintenant expliquer comment configurer le routage dans notre application. La toute première chose à faire est de configurer notre index.html pour s'assurer qu'il est capable de fournir suffisamment de contexte à Angular sur la façon de configurer sa navigation. Pour ce faire, nous utilisons la balise de base dans l'élément head dans index.html. Si l'application est servie à partir de la racine (comme nous le faisons jusqu'à présent), il suffit d'ajouter ce qui suit à votre index.html :  

    <base href="/">    
Ceci est fait automatiquement par Angular CLI, vous n'avez donc besoin de le modifier que si vous servez votre application à partir d'un emplacement non racine. La prochaine chose à faire est d'importer et de configurer le **RouterModule**, car le routage est un module facultatif dans Angular. Avant de pouvoir ajouter le RouterModule, nous devons définir les routes de notre application. Nous allons donc d'abord voir comment définir les itinéraires. Nous reviendrons ensuite sur la manière d'importer et d'ajouter le RouterModule.    
On peut ajouter le RouterModule avec angular CLI:   

    > ng generate module app-routes --flat --module=app
Cela générerait un fichier **app-routes.module.ts** dans le dossier principal de l'application. Nous pouvons en supprimer l'importation de base CommonModule, car nous ne déclarerons aucun composant dans le cadre de notre module de routage. Notre app-routing.module.ts final pourrait ressembler à ceci :  

    import { RouterModule, Routes } from '@angular/router';

    import { StockItemComponent } from './stock/stock-item/stock-item.component';
    import { LoginComponent } from './user/login/login.component';
  

    const appRoutes: Routes = [ // ligne 8
      {path:'login', component: LoginComponent},
      {path: 'stock/item', component: StockItemComponent}
    ]
    @NgModule({
      declarations: [],
      imports: [
        RouterModule.forRoot(appRoutes) // ligne 16
      ],
      exports: [
        RouterModule // ligne 19
        ],
    })
    export class AppRoutesModule { }
* Ligne 8: Déclarez le tableau de routes pour votre application.  
* Ligne 16: Importez et enregistrez les routes pour l'application racine.  
* Ligne 19: Exportez le RouterModule afin que tout module important AppRoutesModule ait accès aux directives du routeur.  

Les routes que nous passons à la méthode **forRoot** ne sont rien d'autre qu'un **tableau de Routes**. Chaque route est simplement une configuration qui définit le chemin de la route, ainsi que le composant à charger lorsque la route est chargée. Nous définissons quatre routes, une pour chacun des composants.    

Ensuite, il nous suffit de connecter ce module à notre module principal, en modifiant le fichier app.module.ts comme suit:  

    @NgModule({
      declarations: [
        AppComponent,
        StockItemComponent,
        LoginComponent
      ],
      imports: [
        BrowserModule,
        AppRoutesModule // connecter module router à notre module principal
      ],
      providers: [UserService, StockService],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
### Affichage du contenu de l'itinéraire (Displaying the Route Contents):   
La dernière chose que nous devons faire pour que notre application de routage soit opérationnelle est de dire à Angular où charger les composants lorsqu'un certain itinéraire ou chemin correspond. Si vous considérez ce que nous avons fait jusqu'à présent, nous avons défini la base de notre routage et mis en place le module et les routes.   

La dernière chose que nous faisons est de marquer où Angular doit **charger (afficher) les composants**, et nous le faisons en utilisant la **directive RouterOutlet: <router-outlet></router-outlet>** qui est mise à disposition dans le cadre du RouterModule. Nous allons modifier le fichier src/app.component.html comme suit :     

    <nav class="navbar navbar-expand-sm bg-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/stock/item">Stock List</a>
            </li>
          </ul>
    </nav>
    <router-outlet></router-outlet>
Auparavant, nous avions le StockListComponent et le CreateStockComponent dans le cadre de ce fichier HTML. Au lieu de cela, nous demandons maintenant à Angular de charger le composant pertinent en fonction de l'URL et du chemin auxquels il correspond. Nous avons également ajouté un tas de liens vers les différentes pages que nous avons ajoutées.     
### Navigation dans l'application (Navigating Within the Application):   
Si vous cliquez sur l'un des liens en haut et ouvrez simultanément l'inspecteur de réseau, vous verrez quelque chose d'intéressant et d'inattendu. Vous verrez que **la page entière se recharge**, or ce comportement ne resemble pas au routage d'une application à page unique *Single-Page Application*. Ce que nous voudrions et attendons, c'est que lorsque la route change, seul le composant est chargé et ses appels XHR respectifs (le cas échéant) sont exécutés. Alors, comment pouvons-nous y parvenir ?    
Angular fournit une directive qui nous permet de naviguer dans l'application. Le fichier app.component.html modifié ressemblerait à ceci:   

    <nav class="navbar navbar-expand-sm bg-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" routerLinkActive="active" routerLink="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLinkActive="active"  routerLink="/stock/item">Stock List</a>
            </li>
          </ul>
    </nav>
    <router-outlet></router-outlet>
Nous avons légèrement modifié le contenu et ajouté un peu de style pour le rendre plus joli. Du point de vue des fonctionnalités, les principaux changements sont les suivants:    
* Nous avons remplacé les liens **href** par une directive angulaire **routerLink**. Cela garantit que toute la navigation se déroule dans Angular.   
* Nous avons également ajouté une autre directive Angular, **routerLinkActive**, qui ajoute l'argument qui lui est passé (actif dans notre cas) en tant que **classe CSS** lorsque le lien actuel dans le navigateur correspond à la directive routerLink. C'est un moyen simple d'ajouter une classe lorsque le lien courant est sélectionné.      

        .active {
            background-color:lavender;
        }
### Caractères génériques et valeurs par défaut (Wildcards and Defaults):  
La dernière chose dont nous nous occuperons avant de terminer cet exemple est la gestion de la charge initiale. Si nous ouvrons http://localhost:4200 dans notre navigateur, nous sommes traités avec une page vide. De même, si on essaie de naviguer vers une URL qui n'existe pas, il en résulte une erreur (dans la console développeur) et une redirection vers la page d'accueil automatiquement. Voyons comment nous pourrions les aborder dans notre application.    

Pour les deux, nous retournerons à notre AppRoutesModule. Nous allons modifier les approutes. module.ts comme suit:   

    const appRoutes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full'},   // ligne 4
      {path:'login', component: LoginComponent},
      {path: 'stock/item', component: StockItemComponent}
    ]
* Ligne 4: Ajouter un chemin par défaut pour rediriger vers la page de connexion.  

Nous avons ajouté une entrée supplémentaire à notre tableau de routes. Ici, nous faisons correspondre le chemin vide et demandons à Angular de nous rediriger vers la route de connexion. Notez que pour n'importe quel chemin, au lieu de demander à Angular d'utiliser un composant, nous pouvons également rediriger vers un autre chemin déjà défini. Notez également **la clé pathMatch**,qui est définie comme complète. Cela garantit que ce n'est que si le chemin restant correspond à la chaîne vide que nous redirigeons vers la route de connexion.     

Le dernier élément que nous verrons est de savoir comment gérer si l'utilisateur saisit une mauvaise URL ou si nous finissons par avoir de mauvais liens dans notre application. Il est toujours utile d'avoir une route capte-tout *catch-all* qui mène à une page "Page non trouvée" ou à une redirection vers une autre page. Voyons comment nous pouvons avoir une telle capacité dans notre application. Encore une fois, nous ne modifierons que les approutes. fichier module.ts:     

      const appRoutes: Routes = [
        { path: '', redirectTo: '/login', pathMatch: 'full'},
        {path:'login', component: LoginComponent},
        {path: 'stock/item', component: StockItemComponent},
        { path: '**', component: PageErrorComponent } // ligne 8
      ]
* Ligne 8: Ajouter une route attrape-tout qui redirige vers la page d'erreure.   

Notre itinéraire attrape-tout est ajouté en faisant correspondre le **chemin** **. En faisant correspondre cette route, nous avons alors la possibilité de charger un composant (comme les autres routes). Alternativement, nous pouvons rediriger à nouveau, comme nous l'avons fait ici, vers un autre itinéraire. Nous redirigeons vers la route /error au cas où nous ne pourrions pas faire correspondre l'URL.   
# Exigences de routage communes (Common Routing Requirements):  
Dans cette section, nous continuerons à creuser dans les capacités de routage angulaire et à voir comment nous pourrions accomplir les tâches courantes nécessaires au cours de la création d'une application Web. En particulier, nous nous concentrerons sur la création et l'utilisation de routes avec des paramètres (à la fois obligatoires et facultatifs), ainsi que sur la compréhension des différentes manières de naviguer dans notre application, que ce soit via le modèle ou via notre code de composant.    
### paramètre de route obligatoir (Required Route Params):  
Voyons d'abord comment nous ajoutons une route où nous pourrions dépendre de la route pour décider quoi charger. La chose la plus simple que nous puissions faire dans le contexte de notre exemple est de créer une page liste pour notre stock. 
### Créer le service: 
Nous ajoutons le fichier stocks.json sour le repertoire ensuite nous ajoutons le module **HttpClientModule** pour récuperer la liste de stock comme ci-dessous:   

      @Injectable({
        providedIn: 'root'
      })
      export class StockService {

        constructor(private http: HttpClient) { }

        getAllStock(): Observable<Stock[]> {
          return this.http.get<Stock[]>('../../assets/data/stocks.json');
        }
      }
### Créer le composant List-stock: 
La on va créer le composant list-stock et on l'ajoute aussi dans notre module router.   

    export class StockListComponent implements OnInit {

      public stocks: Stock [];

      constructor(private stockSrv: StockService) { }

      ngOnInit(): void {
        this.stockSrv.getAllStock().subscribe(
          (data: Stock []) => {
            this.stocks = data;
          }
        );
      }
      
      goDetailList(i: number) {
        console.log('go to list stock', i);
      }
    }
et dans notre Template:   

    <div class="container">
      <div class="card">
        <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
          Liste Stocks
      </h3>
      <div class="card-body">
        <table class="table table-bordered table-responsive-md table-striped text-center">
          <thead>
            <tr>
                <th class="text-center">Id</th>
                <th class="text-center">Name</th>
                <th class="text-center">Code</th>
                <th class="text-center">Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let st of stocks; index as i">
              <td> <span class="table-remove"
                ><button type="button" class="btn btn-danger btn-rounded btn-sm my-0" (click)="goDetailList(st.id)">
                  {{st.id}}
                </button></span
              ></td>
              <td>{{st.name}}</td>
              <td>{{st.code}}</td>
              <td>{{st.exchange}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
### Créer le composant detail:  
Dans le but de garder notre exemple concentré sur le routage, un **StockDetailsComponent** terminé (simpliste) est déjà créé dans le dossier src/app/stocks. Il est déjà enregistré dans l'AppModule. Tout ce qu'il montre est une répétition de l'individu StockItemComponent, mais sans la logique de favoritisme. Avant de l'examiner, voyons d'abord comment la définition de nos routes changerait pour inclure cette nouvelle route. Nous modifierions le fichier app-routes.module.ts comme suit :  

    const appRoutes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      {path:'login', component: LoginComponent},
      {path: 'stock/item', component: StockItemComponent},
      {path: 'stock-list', component: StockListComponent},
      {path: 'stock/:code', component: StockDetailsComponent},
      { path: '**', component: PageErrorComponent }
    ]
Il n'y a qu'un seul ajout à la route, qui est un chemin vers StockDetailsComponent. Notez le chemin, qui est **stock/:id**. Cela inclut une variable dans l'URL, qui peut changer en fonction du stock à charger. Notre composant dans ce cas, le StockDetailsComponent, peut alors lorsqu'il est chargé lire le id de la route, puis charger le stock correspondant depuis notre serveur. Voyons à quoi ressemble le composant Stock Details:

    export class StockDetailsComponent implements OnInit {

      stock: Stock;
      constructor(private stockSrv: StockService,
                  private route: ActivatedRoute) { }  // ligne 16

      ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');  // ligne 19
        this.stockSrv.getById(id).subscribe(
          (data: Stock) => { this.stock = data; }
        );
      }

    }
* ligne 16: Injection de la route activée dans le constructeur.   
* ligne 19: Utilisation de la route activée pour lire le id à partir de l'URL.   

La plupart des composants sont similaires aux autres composants que nous avons vus jusqu'à présent, à deux différences près:   
* Nous injectons ce que nous appelons un **ActivatedRoute** dans le constructeur. La route activée est un service spécifique au contexte qui contient les informations sur la route actuellement activée et sait comment analyser et récupérer des informations à partir de celle-ci.   
* Nous utilisons ensuite ActivatedRoute pour lire le id de stock (id) à partir de l'URL. Notez que nous le lisons à partir d'un instantané. Le paramMap dans l'instantané est une carte de tous les paramètres d'URL. Nous parlerons de ce que cela implique dans un instant.

Ensuite, nous utilisons le id pour effectuer un appel de service et stockons la valeur de retour dans une variable. Ceci est ensuite utilisé pour afficher des informations dans l'interface utilisateur, comme nous l'avons fait jusqu'à présent.    
### Naviguer dans votre application (Navigating in Your Application):  
Maintenant que nous avons la route pour les détails d'un stock, connectons la navigation dans l'application. Voici les quelques activités que nous souhaitons activer:   
* Accédez à la page de la liste des stocks une fois la connexion réussie. 
* Accédez à la page de détail du stock lorsque nous cliquons sur un article en stock dans la liste des stocks.    

Parmi ceux-ci, deux doivent être gérés dans le code TypeScript, tandis que l'autre est géré dans le modèle HTML. Voyons comment nous pouvons y parvenir.   

Tout d'abort on commence par mettre en place le serivce user qui permet de vérifier si le login et mot de passe sont autorisés: 

      @Injectable({
        providedIn: 'root'
      })
      export class UserService {

        constructor(private http: HttpClient) { }

        getAccount(): Observable<Account> {
          return this.http.get<Account>('../../assets/data/account.json');
        }
      }
Nous pouvons apporter une modification similaire au LoginComponent comme suit:   

      export class LoginComponent implements OnInit {

        public loginForm: FormGroup;

        constructor(private fb: FormBuilder,
                    private userService: UserService,
                    private router: Router) { // ligne 18 
          this.createForm();
        }

        ngOnInit(): void { }

        createForm(): void {
          this.loginForm = this.fb.group( {
            name : [null, Validators.required],
            password: [null, Validators.required]
          });
        }

        login() {
          this.userService.getAccount().subscribe(
            (data: Account) => {
              if((data.login === this.username.value)&&
                (data.password === this.password.value)) {
                  console.log('Successfully logged in');
                  this.router.navigate(['stock-list']); // ligne 37
                } else {
                  console.error('Error logging in');
                }
            }
          );
        }

        get username() { return this.loginForm.get('name');}
        get password() { return this.loginForm.get('password');}
      }
* ligne 18: Injecter le routeur dans le composant.  
* ligne 37: Naviguer vers un chemin à l'aide du routeur.   

Nous avons apporté quelques modifications mineures au LoginComponent. Principalement, nous avons maintenant injecté une instance du routeur angulaire **Router** dans notre constructeur, ce qui nous donne les capacités de naviguer dans notre application. Ensuite, lorsque nous effectuons un appel d'enregistrement réussi, à ce stade, nous utilisons l'appel **router.navigate** pour redériger vers la liste de stcok si la connexion réussie. La méthode *navigate* prend un tableau de commandes, qui ensemble se résoudront à un route particulier.   
La méthode router.navigate est plus complexe. Par défaut, tout tableau de commandes que nous lui transmettons aboutit à une URL absolue vers laquelle Angular navigue. Donc, si nous utilisons router.navigate(['stocks', id]), il naviguera vers les stocks/id route.    

Enfin, voyons comment nous pouvons nous assurer que cliquer sur une action nous amène à la page de détails de cette action. Nous avons déjà créé et connecté la route pour le composant Stock Details, qui se trouve à **stock/:id**. Modifions stock-item.component.html comme suit:   

    <div class="stock-container" routerLink="/stock/{{stock.id}}">
        <div class="name" >{{stock.name + ' (' + stock.code + ')' + ' -- ' + stock.id }}</div>
        <div class="name">{{stock.exchange + ' (' + stock.exchange + ')'}}</div>
        <div class="price"
            [class]="stock.isPositiveChange ? 'positive' : 'negative'">$ {{stock.price}}
        </div>
        <button type="button" class="btn btn-primary" (click)="onToggleFavorite($event)"
            [disabled]="stock.favorite">Add to Favorite</button>
        <button type="button" class="btn btn-primary" (click)="changeStockPrice()">Change Price</button>
    </div>
Le seul changement concerne la première ligne, où nous utilisons **la directive routerLink** sur l'élément **div** du conteneur lui-même. Notez que contrairement aux liens que nous avions dans la barre de navigation, nous combinons ici la directive routerLink avec une liaison. Ainsi, en fonction du stock, la valeur de routerLink changera pour contenir le bon **id**.   

Quelques points à noter et à garder à l'esprit:  
* Nous n'avons pas encore ajouté de capacités de stockage local **local storage** dans notre application. Actualiser la page signifie que vous devrez vous reconnecter !  

On peut utiliser **routerLink** aussi de cette façon:  

      <div class="name" >{{stock.name + ' (' + stock.code + ')'}} 
        <i class="stockId" [routerLink]="['/stock', stock.id]">{{stock.id}}</i>
      </div>
### Optional Route param:  
Avant de terminer cette section et cet exemple, nous allons examiner une dernière chose. Il existe des routes pour lesquelles nous pouvons souhaiter des paramètres supplémentaires qui peuvent ou non être facultatifs. Il peut s'agir de choses comme le numéro de page actuel, la taille de la page ou toute donnée de filtrage qui pourrait être transmise, et nous voulons nous assurer qu'elles peuvent être mises en signet. Nous verrons d'abord comment gérer ces cas, puis examinerons rapidement un autre moyen dans Angular de lire à la fois les paramètres définis et les paramètres de requête.    

Supposons que nous voulions passer un numéro de page au StockListComponent afin qu'il puisse afficher la page correspondante. Maintenant, ce paramètre serait facultatif, nous voulons donc le passer en tant que paramètre de requête.     

Tout d'abord, modifions le *LoginComponent* pour transmettre un numéro de page à la route, ici juste je vais mettre le code de **la fonction login()**:    

    login() {
        this.userService.getAccount().subscribe(
          (data: Account) => {
            if((data.login === this.username.value)&&
              (data.password === this.password.value)) {
                console.log('Successfully logged in');
                this.router.navigate(['stock-list'], {
                  queryParams: {page: 1}  //38
                }
                );
              } else {
                console.error('Error logging in');
              }
          }
        );
      }
* ligne 38: Passer des paramètres de requête dans le cadre de la demande de navigation.  

Nous avons apporté une légère modification au router.navigate dans l'abonnement, en ce sens que nous passons un objet **queryParams** dans le cadre du deuxième argument de l'appel. Cela se traduira par des paramètres de requête dans la route.   

Voyons maintenant comment nous pourrions lire les paramètres de requête lorsque cela est nécessaire dans notre composant. Nous modifierions le StockListComponent comme suit (j'ajoute le code du consturctuer et la fonction ngOnInit()):   

    constructor(private stockSrv: StockService,
                  private router: Router,
                  private activatedRoute: ActivatedRoute) { } //linge 18

    ngOnInit(): void {
        console.log('Page No. : ', this.activatedRoute.snapshot.queryParamMap.get('page')); // ligne 21
        this.stockSrv.getAllStock().subscribe(
          (data: Stock []) => {
            this.stocks = data;
          }
        );
      }
* ligne 18: Injecter l'ActivatedRoute actuel dans le constructeur.   
* ligne 21: Read the query parameter from the route snapshot.  

Très similaire à la façon dont nous lisons les paramètres définis, nous pouvons également lire les paramètres de requête à partir de l'instantané ActivatedRoute. Dans ce cas, lorsque nous exécutons l'application, lorsque nous nous connectons avec succès, nous verrions que notre itinéraire dans le navigateur devient *http://localhost:4200/stock-list?page=1*, et nous obtenons le numéro de page affichée dans la console.    
# Route Guard: 
La prochaine chose que nous aborderons est le concept de gardes de route (**Route guards**). Les gardes de route dans Angular sont un moyen de protéger le chargement ou le déchargement d'une route en fonction de vos propres conditions. Les gardes de route vous offrent une grande flexibilité dans les types de vérifications que vous souhaitez ajouter avant l'ouverture ou la fermeture d'une route. Dans cette section, nous traiterons de trois en particulier : une garde pour empêcher l'ouverture d'une route, une garde pour empêcher la fermeture d'une route et une garde qui charge les données nécessaires avant qu'une route ne soit ouverte. Nous garderons les exemples très simples, mais ceux-ci pourraient être étendus pour faire tout ce qui est nécessaire dans votre cas d'utilisation.    
### Routes authentifiées uniquement (Authenticated-Only Routes):   
La première chose à laquelle nous allons nous attaquer est le problème que nous avons vu dans la section précédente, où si nous essayions de naviguer vers le composant Stock List sans nous connecter, nous finirions par voir une page vide. Ce que nous voudrions idéalement dans ce cas, c'est un message ou une erreur, et une redirection vers la page de connexion afin que nous puissions inviter l'utilisateur à se connecter.    

Pour ce faire, la première chose que nous allons faire est de créer un AuthGuard. Pour le démarrer, vous pouvez bien sûr utiliser la CLI angulaire (rappelez-vous, **ng g guard guards/auth** fera l'affaire). Remplacez le contenu du fichier généré (src/app/guards/auth.guard.ts) par ce qui suit:   

    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {
      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          console.log('AuthGuard#canActivate called');
        return true;
      }
    }
La classe AuthGuard est simple et ressemble et se comporte comme un service Angular. Le service a l'air assez simple, mais passons en revue les changements un par un:   
* Nous implémentons une interface appelée **CanActivate** à partir du module de routeur angulaire.   
* Nous implémentons ensuite la méthode canActivate. La méthode canActivate peut retourner un booléen ou un Observable<boolean>. S'il devient vrai, la route s'activera. Sinon, la route ne s'ouvrira pas.    

Dans la dernière étape, nous pouvons ajouter notre logique personnalisée, si nécessaire. Par exemple, nous pourrions conserver l'URL que nous essayions d'ouvrir. Une fois que l'utilisateur s'est connecté avec succès, nous pouvons alors rediriger vers l'URL enregistrée plutôt que vers l'URL par défaut.   

##### localStorage:   
**LocalStorage (stockage local** est un moyen de stocker un état dans un projet Angular. localStorage une API fait partie de JavaScript.   
LocalStorage à 4 fonctions:  
* setItem(key: string, data: string | JSON): void
* getItem(key: string): string | JSON | null  
* removeItem(key: string): undefined
* clear(): undefined

L'idéé ici est de stocker l'état de notre connexion, si notre connexion, si la connection est réussi alors on met success dans notre localStorage, si non on met failure.  

      login() {
          this.userService.getAccount().subscribe(
            (data: Account) => {
              if((data.login === this.username.value)&&
                (data.password === this.password.value)) {
                  console.log('Successfully logged in');
                  this.router.navigate(['stock-list'], {
                    queryParams: {page: 1}
                  }
                  );
                  localStorage.setItem("auth", "success");  // ligne 41
                } else {
                  localStorage.setItem("auth","failure"); // ligne 43
                  console.error('Error logging in');
                }
            }
          );
        }
* ligne 41: on met à jour la valeur auth de localStorage à success on cas de succés.
* ligner 42: on met à jour la valeur auth de localStorage à failure on cas d'échec.  

En suite on modifie notre service **AuthGuard** pour prendre en compte de notre localStorage.   

    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {
      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          if("success" === localStorage.getItem("auth")){
            return true;
          }
          return false;
      }
    }
##### Connection AuthGuard avec le routage:   
Maintenant, connectons notre AuthGuard au routage. Nous allons modifier le module *AppRoutesModule* comme suit :  

    const appRoutes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      {path:'login', component: LoginComponent},
      {path: 'stock/item', component: StockItemComponent, canActivate: [AuthGuard]},  // ligne 14
      {path: 'stock-list', component: StockListComponent, canActivate: [AuthGuard]},  // ligne 15
      {path: 'stock/:id', component: StockDetailsComponent, canActivate: [AuthGuard]},  // ligne 16
      { path: '**', component: PageErrorComponent }
    ]
    @NgModule({
      declarations: [],
      imports: [
        RouterModule.forRoot(appRoutes)
      ],
      exports: [
        RouterModule
        ],
    })
    export class AppRoutesModule { }
* ligne 14: Ajouter AuthGuard au composant StockItemComponent
* ligne 14: Ajouter AuthGuard au composant StockListComponent
* ligne 14: Ajouter AuthGuard au composant StockDetailsComponent

Aux trois routes de stock, nous avons ajouté une autre clé à la définition de la route. Nous avons ajouté une **clé canActivate**, qui prend un tableau de gardes. Nous n'avons que AuthGuard, nous le transmettons donc comme seul élément du tableau. Ainsi, seules les routes que nous ajoutons à la garde canActivate utiliseront la garde, et les autres continueront à fonctionner normalement.    
# Préchargement des données à l'aide de Resolve (Preloading Data Using Resolve):
La dernière chose que nous verrons dans cette section est de savoir comment **précharger les données** avant qu'un route ne soit activé. Il peut arriver que nous souhaitions effectuer l'appel de service pour récupérer ses données avant le chargement du composant. De même, nous pourrions vouloir vérifier si les données existent avant même d'ouvrir le composant. Dans ces cas, il peut être judicieux d'essayer de pré-extraire les données avant le composant lui-même. Dans Angular, nous le faisons à l'aide d'un résolveur **Resolve**.   

Prenons un exemple pour montrer comment fonctionne un résolveur et comment vous pouvez en implémenter un. Supposons que nous voulions résoudre les données de stock avant même d'ouvrir les détails d'un stock. Cela nous permettrait également, dans un certain sens, de vérifier si le stock avec un code particulier existe avant même d'ouvrir le composant de détail du stock. 
Pour créer un résolver on peut faire recour à anglura CLI: 

    > ng g resolver resolvers/stock-load
Cette commande nous crée un resolver de base il resemble à ça:   

    @Injectable({
      providedIn: 'root'
    })
    export class StockLoadResolver implements Resolve<boolean> {
      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(true);
      }
    }

le résolveur **resolver** StockLoadResolver implémente l'interface **Resolve** et est typé. Dans ce cas, nous construisons un résolveur qui renvoie un stock individuel. Nous injectons le StockService dans le constructeur, puis implémentons la méthode de résolution. Ici, nous avons accès à la route et à l'état, ce qui nous permet de récupérer les informations de paramètre à partir de l'URL.   

Dans la résolution, nous chargeons le stockId à partir de l'URL, puis renvoyons un Observable<Stock> en effectuant l'appel de service à getStock pour le stockBuId donné. C'est tout ce qu'il y a dans le Résolveur. Nous modifions notre resolver comme ici:   

      @Injectable({
        providedIn: 'root'
      })
      export class StockLoadResolver implements Resolve<Stock> {
        constructor(private stocksrv: StockService) {}
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stock> {
          const id = route.paramMap.get('id');
          return this.stocksrv.getById(id);
        }
      }
Assurez-vous de le connecter à le module *AppRoutesModule* et de l'enregistrer avec le tableau des fournisseurs comme les Guards.    

      const appRoutes: Routes = [
        { path: '', redirectTo: '/login', pathMatch: 'full'},
        {path:'login', component: LoginComponent},
        {path: 'stock/item', component: StockItemComponent, canActivate: [AuthGuard]},
        {path: 'stock-list', component: StockListComponent, canActivate: [AuthGuard]},
        {path: 'stock/:id', component: StockDetailsComponent,
        canActivate: [AuthGuard],
        resolve: {stock: StockLoadResolver}}, // ligne 20
        { path: '**', component: PageErrorComponent }
      ]
* Ligne 20: Ajouter un résolveur **resolver** à la route des détails du stock.   

Encore une fois, ce fichier n'a changé que sur une ligne. À la route stock/:id, nous avons maintenant ajouté une clé de résolution, qui est un objet. Pour chaque clé de l'objet, nous mappons une implémentation de Resolver. Dans ce cas, nous n'avons que le **stock** qui doit être résolu à l'aide du StockLoadResolverService. C'est une partie du travail qui doit être fait, qui garantit que le stock avec le code donné (basé sur l'URL) est préchargé.   

Voyons ensuite comment modifier le StockDetailsComponent pour utiliser les informations préchargées au lieu de faire l'appel de service lui-même :   

    export class StockDetailsComponent implements OnInit {

      stock: Stock;
      constructor(private stockSrv: StockService,
                  private route: ActivatedRoute) { }

      ngOnInit(): void {
        this.route.data.subscribe((data: {stock: Stock}) => {
          this.stock = data.stock;
        });
      }
    }
Le changement majeur dans le composant est que nous nous sommes maintenant débarrassés de notre dépendance au StockService. Au lieu de cela, nous utilisons simplement ActivatedRoute. Dans ngOnInit, nous souscrivons aux modifications de l'élément de données sur ActivatedRoute. Les données résolues seraient mises à disposition dans les données avec **la clé** que nous avons utilisée dans l'itinéraire (**stock** pour nous). Nous lisons simplement la clé et stockons les données à utiliser.   

