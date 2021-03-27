# react-to-die

- Introduce about your project
  this project I build to teach myself about how to set up a react project without create-react-app
- How other people can run your project
- What you used in your project
    I use:
    - typescript
    - babel
    - sass
    - webpack
- What you have learned from every chapter
    - install prettier and Ctrl+P choose Format Document, then choose format document  with Prettier and set a shortcut for this extension
    - what is package-lock.json
    - setup sass
    - setup webpack to compile all module into a bundler
    - State and prop change will trigger re-rendering the component but dont clear the states
    - using const array b = array a is shallow copy, it make items of two array have the same references, means a value of array b's item changes cause the change to the same item in array a
    - sort method mutates array
    - using deep clone by spreading ( [...array]) to avoid effact the original array
    - When you drop anything on the child element or any event takes place on the child element, the Event Target is always the child element because that is the place where the event took place. That is the target.
    - if you want to trigger event in parent, call (e.currentTarget.id)
    - using localStorage to store data in local, localStorage store data in string, using JSON strinlify and parse to convert data
    