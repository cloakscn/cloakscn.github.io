---
title: About Go Reflection
date: 2023-03-26 18:05:30
categories: Notes
tags:
  - Go
---

In Go, the `reflect` package is a built-in package that provides a set of methods and types for runtime reflection. Reflection enables dynamic access and manipulation of the **values, types, and methods** of variables during runtime. The primary purpose of `reflect` is to implement generic code, such as JSON serialization and deserialization, type conversion, and struct copying.

<!-- more -->

The main types and functions in the `reflect` package include:

1. **Type and Value Types:** They represent the reflection information for types and values, respectively. You can use the `reflect.TypeOf` and `reflect.ValueOf` functions to obtain reflection information for types and values.

2. **Kind Type:** It represents the underlying type of a value, such as `int`, `string`, `struct`, etc. You can use the `Value.Kind` method to obtain the kind of a value.

3. **StructField Type:** It represents information about fields in a struct, such as name, type, tags, etc. You can use the `Type.Field` method to obtain information about fields in a struct.

4. **Elem Method:** It is used to get the element type of pointer, array, slice, map, channel, etc. For example, the `Value.Elem` method can be used to get the element type of a pointer or interface.

5. **FieldByName and MethodByName Methods:** They are used to get fields and methods of a struct by name. For example, the `ValueFieldByName` method can be used to get a field of a struct, and the `Value.MethodByName` method can be used to get a method of a struct.

6. **Set Method:** It is used to set the value of a variable. For example, the `Value.Set` method can be used to set the value of a variable.

It is important to note that reflection comes with lower efficiency as it involves runtime type checking and dynamic memory allocation. Therefore, in practical development, excessive use of reflection should be avoided.

## How to Use

**Get the Type and Value of a Variable**

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var x int = 10
    fmt.Printf("Type: %v, Value: %v\n", reflect.TypeOf(x), reflect.ValueOf(x))
}

// Output
Type: int, Value: 10
```

**Get Information about Struct Fields**

```go
package main

import (
    "fmt"
    "reflect"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Tom", Age: 20}
    t := reflect.TypeOf(p)
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("%v: %v\n", field.Name, field.Type)
    }
}

// Output
Name: string
Age: int
```

**Invoke a Function Using Reflection**

```go
package main

import (
    "fmt"
    "reflect"
)

func Add(a, b int) int {
    return a + b
}

func main() {
    fn := reflect.ValueOf(Add)
    args := []reflect.Value{reflect.ValueOf(10), reflect.ValueOf(20)}
    result := fn.Call(args)
    fmt.Println(result[0].Int())
}

// Output
30
```

**Set Value**

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var x int = 10
    fmt.Println("Before:", x)

    v := reflect.ValueOf(&x).Elem()
    v.SetInt(20)

    fmt.Println("After:", x)
}

// Output
Before: 10
After: 20
```

In the above code, we first define an `int` type variable `x` and initialize it to 10. Then, we use `reflect.ValueOf(&x).Elem()` to get the value of the variable `x` and use `v.SetInt(20)` to set its value to 20. Finally, we output the value of the variable `x`, and we can see that its value has been successfully set to 20.

It is important to note that only variables that can be modified can be set using the `reflect` package. If a variable is unmodifiable (e.g., a constant or a read-only variable), it will result in a compilation error.

## Q&A

**`Q: What is the difference between reflect.Typeof().Kind() and reflect.Valueof().Kind()?`**

**`A:`**
`reflect.TypeOf` and `reflect.ValueOf` functions return types and values of variables, ensuring that the type and value of a variable can be obtained at runtime. Among them, `TypeOf` function returns the type information of a variable, and `ValueOf` function returns the value information of a variable. Both functions return a value of type `reflect.Type` or `reflect.Value`, which contains the type and value information of the variable.

In the `reflect.Type` type, there is a `Kind` method, which returns an enumeration type `reflect.Kind` that represents the underlying type of the variable.

In the `reflect.Value` type, there is also a `Kind` method, which returns an enumeration type `reflect.Kind` that represents the underlying type of the variable.

The `reflect.Kind` enumeration type defines 27 constants representing basic types and some composite types in Go. These constants include `reflect.Bool, reflect.Int, reflect.Float64, reflect.String`, and so on.

Therefore, with `TypeOf` and `ValueOf` functions and the `Kind` method, we can obtain the type and value of a variable at runtime and manipulate it. This provides great convenience for dynamic type and value handling.

---

**`Q: What is the type of a variable, and what is the type of a value?`**

**`A: `**
The type of a variable refers to the type of data represented by the variable, such as an integer, floating-point number, string, etc. In Go, each variable must have an explicit type, which can

 be a built-in type (e.g., `int, float, string`, etc.) or a custom type (e.g., struct, interface, etc.).

The type of a value refers to the specific data type stored in the variable. For example, a variable with type `int` might have a value of 42, -100, or 0. Similarly, a variable with type `string` might have a value of "hello," "world," etc.

In Go, the type of a variable and the type of its value are closely related. Each variable must have a definite type, and its value must be compatible with that type. For example, if a variable has type `int`, its value must be an integer. If a variable has type `string`, its value must be a string. If a variable has type `struct`, its value must be a struct.

The type of a variable and the type of its value can be obtained and manipulated at runtime using reflection. This provides great convenience for dynamic type and value handling.

## Case Study: Reflection Implementation of Java BeanUtils.CopyProperties() Method

```go
package main

import (
    "fmt"
    "reflect"
)

type Address struct {
    City    string
    Country string
}

type Person struct {
    Name    string
    Age     int
    Address Address
}

func (p *Person) CopyProperties(src *Person) {
    value := reflect.ValueOf(src).Elem()
    destValue := reflect.ValueOf(p).Elem()

    for i := 0; i < value.NumField(); i++ {
        destField := destValue.FieldByName(value.Type().Field(i).Name)
        if destField.IsValid() && destField.CanSet() {
            srcField := value.Field(i)
            if srcField.Type().Kind() == reflect.Struct {
                nestedDest := destField.Addr().Interface()
                nestedSrc := srcField.Addr().Interface()
                if _, ok := nestedDest.(Copiable); ok {
                    nestedDest.(Copiable).CopyProperties(nestedSrc.(Copiable))
                }
            } else {
                destField.Set(srcField)
            }
        }
    }
}

type Copiable interface {
    CopyProperties(src Copiable)
}

func main() {
    p1 := Person{
        Name: "Alice",
        Age:  30,
        Address: Address{
            City:    "New York",
            Country: "USA",
        },
    }

    p2 := Person{}
    p2.CopyProperties(&p1)

    fmt.Printf("p1: %+v\n", p1)
    fmt.Printf("p2: %+v\n", p2)
}
```

In this example, we defined a `Person` struct and an `Address` struct. The `Person` struct contains an embedded `Address` struct. We also defined a `Copiable` interface, indicating types that can be copied. The `Person` struct implements the `Copiable` interface and provides the `CopyProperties` method to copy properties.

In the `CopyProperties` method, we use reflection to iterate over the fields of the source struct and copy them to the destination struct. If a field is a nested struct, we recursively call the `CopyProperties` method for nested copying.

In the `main` function, we created a `Person` instance `p1` and copied it to another `Person` instance `p2`. We can see that all fields, including the nested `Address` struct, are copied to `p2`.

This case study demonstrates how reflection can be used to implement a flexible and generic method for copying properties between structs with nested structs.