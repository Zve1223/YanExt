# YanExt
## Just another Extansion
As I said, just another extension.
It has small functionality, so, I'll explain it.
The main idea of this plugin is accelerate typing of some constructions in C/C++.
For example, if you write "//ii<10//" it will transform to "if (i<10) { }" and shift your cursor between branches.
Let me show it more in detail:

# //i
This is one of four shortcuts which transforms to if construction.
After "i" goes some logic expression like "i < 10" and it will be placed between two branches after "if".
Like that:
```c
//ii == someValue//
```
->
```c
if (i == someValue) {
    
}
```
Pretty simple, right?

# //ie
Just like previous, but with "else" at the end:
```c
//ibiba != bobae//
```
->
```c
if (biba != boba) {
    
} else {
    
}
```
Let's go to another!

# //w
Like //i, but with while:
```c
//wi++ < 1223//
```
->
```c
while (i++ < 1223) {
   
}
```
A little bit boring...

# //f
Ouh... It's my favourite one!
Just look:
```c
//f123variable<=999//
```
->
```c
for (int variable = 123; variable <= 999; variable++) {
    
}
```
So genius! I think.
You can add custom third expression (like "++" or "--") just like that:
```c
//f0i<10+= 2//
```
->
```c
for (int i = 0; i < 10; i += 2) {
   
}
```
Understand?

### That's all, bye!
