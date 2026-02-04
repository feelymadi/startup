# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 98.84.244.108
This was such a struggle thb. I had to do it twice and it works now but I need to figure out how to delete one of my instances.

## Caddy

The first time I tried it apparently had the wrong kind of IP address?? So I changed the elastic IP address and it magically worked.

## HTML

I was worried about this but I think it will be easier then I anticipated. 

## CSS

day 1: okay first I focused on just getting everything to be the right kind of container... I guess, by using the proper selectors. I learned about a sticky footer. I learned how to impliment a hamburger menu for the responsivness of my page. I also adjusted the colors of stuff. So yeah pretty cool. 

day 2: format body, change font
grid for vertical stack buttons, flex for hortz

you have to load in the css file after bootstrap in your head *mind blown*

add class descriptor to override

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
