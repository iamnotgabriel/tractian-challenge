# CHALLENGE

[![youtube image](https://github.com/iamnotgabriel/tractian-challenge/blob/main/screenshot.png?raw=true)](https://www.youtube.com/watch?v=pzetH5bFmgk)

## Context
Our users, Emerson and Roberta, are maintenance managers at Industria Freios Supremos (auto parts manufacturer), and they have 2 units and 10 assets (machines) in total. They would like to be able to register and view both the units separately, as well as have an overview that condenses the data from the two units.

## Challenge
Build a CRUD where the user can register companies, units, assets and users
[x] companies
    [x] create
    [x] read
    [x] update
    [x] delete
    [x] list
[x] users
    [x] create
    [x] read
    [x] update
    [x] delete
    [x] list
[x] units
    [x] create
    [x] read
    [x] update
    [x] delete
    [x] list
    [x] list assets by unit
[x] assets
    [x] create
    [x] read
    [x] update
    [x] delete
    [x] list

## Important
- Each asset must have an image, name, description, model, owner, status and health level;
- Each asset is part of a unit;
- Each unit is part of a company;
- Every user is part of a company;
- There are three types of status: Running, Alerting, Stopped;
- Health level needs to be between 0% to 100%.

## DISCLAIMER
This project is a challenge to a hiring process and a exercise on some of my ideas:
    1. Rust like error treatment in Typescript
    2. Stretch my abilities of building lots of abstraction to decrease code repetition
    3. Some of you may the frequency of composition in my classes (again exercise)

## ARCHITECTURE
This project is heavily based on clean architecture and abstractions!


## Directory structure
./src
├──**api**       ->>  presentation layer, all the http and api is here
├──**data**      ->>  persistence layer, all communications with mongodb is here
├──**domain**    ->>  modeling of domain into objects and validations
├──**main**      ->>  startup server process and application startup 
├──**resources** ->>  objects that can be used by other layers like configuration variables and use-case instances
└──**use-case**  ->>  classes that put everything together, receives data from the presentation and talk to plugins


## My view on Clean Arch
The major values that contributed to this project organization are:
    1. The great segregation between WEB, logic and persistence
    2. Dependencies as plugins interfaces
    3. Abstraction through composition to reduce code repetition
    4. Keep related things together and use main only to start the program

comments:
 1. Segregating this concerns helps testing and reusing code
 2. Use dependencies as required plugins to use a piece of code like a video game and a tv.
Console makers give you an interface to plugin the tv use in your home. Declare the dependency and 
leave to the user to decide on what is going to work with.
 3. Abstraction is powerful tool, don't underestimate it, build on top of code you already wrote.
This is principle of elegance and standardization of functionality. Due to a if everyone can reuse 
your code than the same behavior is going to be repeated (test, test and tests). This is a engineering
perspective that leads to predictable functionally and happy customers, everything happens as always.
In my opinion composition is explicit and leads to better code navigation and understatement then 
inheritance (although inheritance continuos to be very good, and used in the project obliviously)
 4. I don't like the take on clean arch that segregates things of the same abstraction level.
Like http routes (path+query+...) from the handler that is exposed by this route. So i tried to build 
things so they stay together. Still i think there is room for improvement (maybe decorators could help),
but this is a debate for a next project.

