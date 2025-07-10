const style = document.createElement('style');
style.textContent = `
    .Liquidglass {
        width: 500px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 1.2em;
        border-radius: 25px;
        background-color: color-mix(in srgb, #bbbbbc 12%, transparent);
        backdrop-filter: blur(8px) saturate(150%);
        -webkit-backdrop-filter: blur(8px) saturate(150%);
        box-shadow: inset 0 0 0 1px
            color-mix(in srgb, #fff 10%, transparent),
            inset 1.8px 3px 0px -2px color-mix(in srgb, #fff 90%, transparent),
            inset -2px -2px 0px -2px color-mix(in srgb, #fff 80%, transparent),
            inset -3px -8px 1px -6px color-mix(in srgb, #fff 60%, transparent),
            inset -0.3px -1px 4px 0px
            color-mix(in srgb, #000 12%, transparent),
            inset -1.5px 2.5px 0px -2px
            color-mix(in srgb, #000 20%, transparent),
            inset 0px 3px 4px -2px color-mix(in srgb, #000 20%, transparent),
            inset 2px -6.5px 1px -4px
            color-mix(in srgb, #000 10%, transparent),
            0px 1px 5px 0px
            color-mix(in srgb, #000 10%, transparent),
            0px 6px 16px 0px
            color-mix(in srgb, #000 8%, transparent);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        font-family: sans-serif;
        color: #224;
    }
`;
document.head.appendChild(style);

const div = document.createElement('div');
div.className = 'Liquidglass';
div.textContent = '我阿里爱你';
document.body.appendChild(div);