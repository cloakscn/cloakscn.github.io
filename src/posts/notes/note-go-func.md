---
title: Contemplations on `var CommandLine = func() func {}`
categories: Notes
tags:
  - Go
date: 2023-04-14 17:00:47
---

This article explores my divergent thoughts on functional programming.

<!-- more -->

The statement `var CommandLine = func() func {}` defines a variable named `CommandLine`. Its type is a function that takes no parameters and returns a function with no specified return type. Specifically, `CommandLine` is a variable of function type, and the function it returns is a function without parameters and without a specified return type.

Such a function type can be used to implement programming patterns like decorators or factory functions, and it can achieve polymorphism by returning different functions. In this specific statement, since the returned function doesn't specify a concrete type, you can choose to return functions of different types based on specific scenarios and requirements.

## Decorator Pattern

```go
func LoggingMiddleware(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        h.ServeHTTP(w, r)
    })
}

func main() {
    // Create a router
    router := http.NewServeMux()

    // Register a handler function
    router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })

    // Decorate the handler function with LoggingMiddleware
    loggedRouter := LoggingMiddleware(router)

    // Start the server
    log.Fatal(http.ListenAndServe(":8080", loggedRouter))
}
```

In this example, we define a `LoggingMiddleware` function that takes an `http.Handler` parameter and returns a new `http.Handler` handler function. In the new handler function returned, we first log the HTTP method and URL path of the request and then call the original handler function `h`. In this function, we forward the request to the next handler and log to the console after the response.

In the main function, we first create an HTTP router and register a root path handler function using `router.HandleFunc`. Then, we decorate this handler function with `LoggingMiddleware` by creating a new handler named `loggedRouter`. Finally, we start the server, using `loggedRouter` as the server's handler.

In this example, by using the decorator pattern, we decouple the logging functionality from the original handler function, making it easy to modularize and compose operations. Moreover, this pattern can be used to add features such as authentication, rate limiting, caching, etc., dynamically modifying processing logic and enhancing the system's functionality and extensibility.

## Factory Function

```go
type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) *Person {
    return &Person{
        Name: name,
        Age:  age,
    }
}

func main() {
    // Create Person objects using the NewPerson function
    p1 := NewPerson("Alice", 20)
    p2 := NewPerson("Bob", 25)

    // Output information about Person objects
    fmt.Printf("%+v\n", p1)
    fmt.Printf("%+v\n", p2)
}
```

In this example, we define a `Person` struct and implement a `NewPerson` factory function, which returns a newly created `Person` object. This function takes `Name` and `Age` parameters and internally uses `&Person{}` to create and initialize a new `Person` object. The advantage of this factory function is that it avoids repeating the use of `Person{}` in other code, improving code readability and maintainability.

In the main function, we use the `NewPerson()` function to create two `Person` objects and output their information. By using a factory function, we can gain a clearer understanding of how to create `Person` objects without delving into the implementation. Additionally, this approach facilitates easy extension and modification, such as adding logic for parameter validation, type conversion, default values, etc., in the factory function.

