flowchart TD
    A([Start App]) --> B[Load Config]
    B --> C{Config valid?}
    C -- Yes --> D[Initialize Server]
    C -- No --> E[Show Error]
    D --> F[App Running]
