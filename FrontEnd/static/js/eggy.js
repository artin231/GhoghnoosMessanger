/*
 * Eggy JS 1.0.0
*/

const EGGY_ICONS = {
success: '<i class="bi bi-check-circle-fill"></i>',
info: '<i class="bi bi-info-circle-fill"></i>',
warning: '<i class="bi bi-exclamation-triangle-fill"></i>',
error: '<i class="bi bi-x-circle-fill"></i>',
close: '<button type="button" class="close-btn"><i class="bi bi-x"></i></button>'
};

const EGGY_CSS = `
.eggy { position: fixed; z-index: 9999; display: flex; flex-direction: column; gap: 0.625rem; pointer-events: none; }
.eggy.top-right { top: 1.25rem; left: 1.25rem; }
.eggy.top-left { top: 1.25rem; right: 1.25rem; }
.eggy.bottom-right { bottom: 1.25rem; left: 1.25rem; }
.eggy.bottom-left { bottom: 1.25rem; right: 1.25rem; }
.eggy .eggy, .eggy > div { pointer-events: auto; }
.eggy > div { position: relative; overflow: hidden; display: flex; align-items: flex-start; gap: 0.625rem; min-width: 18rem; max-width: 22rem; padding: 0.875rem 1rem; border-radius: 10px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5); font-size: 0.875rem; line-height: 1.5; direction: rtl; text-align: right; opacity: 0; transform: translateY(8px); transition: opacity 0.25s ease, transform 0.25s ease; }
.eggy > div.open { opacity: 1; transform: translateY(0); }
.eggy > div.closing { opacity: 0; transform: translateY(8px); }
.eggy > div > .title, .eggy > div > .message { font-family: 'Vazirmatn', system-ui, sans-serif; }
.eggy > div .title { font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.125rem; }
.eggy > div .message { opacity: 0.85; }
.eggy > div > .bi { font-size: 1.25rem; margin-top: 0.125rem; }
.eggy > div .close-btn { position: absolute; top: 0.5rem; left: 0.5rem; color: inherit; opacity: 0.55; padding: 0.25rem; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: opacity 0.15s ease, background 0.15s ease; }
.eggy > div .close-btn:hover { opacity: 1; background: rgba(255, 255, 255, 0.08); }
.eggy > div .close-btn .bi { font-size: 0.875rem; }
.eggy > div > .progress-bar { position: absolute; bottom: 0; right: 0; left: 0; height: 3px; transform-origin: left center; animation: eggy-progress linear forwards; }
@keyframes eggy-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
`;

const EGGY_CSS_THEME = `
.eggy .eggy-success, .eggy div.success { background: #1d2b22; color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.35); }
.eggy .eggy-info, .eggy div.info { background: #182031; color: #93c5fd; border: 1px solid rgba(147, 197, 253, 0.35); }
.eggy .eggy-warning, .eggy div.warning { background: #2b2413; color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.35); }
.eggy .eggy-error, .eggy div.error { background: #2b1a1d; color: #f5424e; border: 1px solid rgba(245, 66, 78, 0.35); }
`;

const EGGY_CSS_PROGRESS_BAR = `.eggy .progress-bar { background: currentColor; opacity: 0.4; }
`;

class Builder {

    //Constructor
    constructor(userOptions){
        //Build our default options
        this.options = {
            ...this.buildDefaultOptions(userOptions),
            ...userOptions
        };
    }


    /**
     * Create a new toast
     * 
     * @return {Promise}
    */
    async create(){
        //Add our styling
        await Promise.all([
            this.addStyling(),
            this.addTheme()
        ]);
        //Build it
        let toast = await this.build();
        //Toast bindings
        await this.bindings(toast);
        //Once its buil, open it after a split second
        setTimeout(() => {
            toast.classList.add('open');
        }, 250);
        //Wait the specified time in the options then close it
        setTimeout(() => {
            this.destroyToast(toast);
        }, this.options.duration);
        //Done
        return toast;
    }


    /**
     * Build the popup
     * 
     * @return {Promise} HTMLElement The new toast
    */
    async build(){
        //Create one
        let wrapper = await this.createWrapper();
        //Create the toast
        let toast = await this.createToast();
        //Put the toast in the wrapper
        wrapper.appendChild(toast);
        //Resolve
        return toast;
    }


    /**
     * Create the toast element
     * 
     * @return {Promise} 
    */
    async createToast(){
        //Create the element
        let toast = document.createElement('div'),
            innerWrapper = document.createElement('div');
        //Generate a random toast id
        toast.setAttribute('id', 'eggy-'+Math.random().toString(36).substr(2, 4));
        //Set toast attributes
        toast.classList.add(this.options.type);
        //Are we adding a title?
        if(this.options.title){
            let title = document.createElement('p');
            title.classList.add('title');
            title.innerHTML = this.options.title;
            innerWrapper.appendChild(title);
        }
        //Are we adding a message?
        if(this.options.message){
            let message = document.createElement('p');
            message.classList.add('message');
            message.innerHTML = this.options.message;
            innerWrapper.appendChild(message);
        }
        //Append the icon, inner wrapper and close btn to the toast
        toast.innerHTML = await this.getIconContent();
        toast.appendChild(innerWrapper);
        toast.innerHTML += await this.getCloseBtnContent();
        //Are we adding a progress bar?
        if(this.options.progressBar){
            toast = this.addProgressBarToToast(toast);
        }
        //Return it
        return toast;
    }


    /**
     * Destroy the toast, remove it!
     * 
     * @param {HTMLElement} toast - The toast element we're removing
     * @return {Promise}
    */
    async destroyToast(toast){
        //Add the closing class for smooth closing
        toast.classList.add('closing');
        //After 200ms (the length of the css animation plus a bit), remove it
        setTimeout(() => {
            toast.remove();
        }, 450);
    }


    /**
     * Add all of the bindings for the toast
     * 
     * @param {HTMLElement} toast - The toast we're building the bindings for
     * @return {Promise}
    */
    async bindings(toast){
        //Close btn
        toast.querySelector('.close-btn').addEventListener('click', async () => {
            this.destroyToast(toast);
        })
    }
    
    
    /**
     * Create the element that the toasts are wrapped in
     * 
     * @return {Promise} The wrapper HTML Element
    */
    async createWrapper(){
        //Return an existing wrapper if it exists
        let wrapper = await this.isAlreadyOpen();
        if(!wrapper){
            //Create the element
            wrapper = document.createElement('div');
            //Set its attributes
            wrapper.classList.add('eggy', this.options.position);
            //Append it to the page and return it
            document.querySelector('body').appendChild(wrapper);
        }
        //Return it
        return wrapper;
    }


    /**
     * Check if there is already a toast initialised in the specified position
     * 
     * @return {Promise} The wrapper if it exists, false if it doesnt
    */
    async isAlreadyOpen(){
        //Get the wrapper
        let wrapper = document.querySelector(`.eggy.${this.options.position}`);
        return (wrapper ? wrapper : false);
    }
    

    /**
     * Get the icons content
     *
     * @return {Promise}
    */
    async getIconContent(){
        //Switch the type
        switch(this.options.type){
            case 'success':
                return EGGY_ICONS.success;
            break;
            case 'info':
                return EGGY_ICONS.info;
            break;
            case 'warning':
                return EGGY_ICONS.warning;
            break;
            case 'error':
                return EGGY_ICONS.error;
            break;
        }
    }


    /**
     * Get the close content
     *
     * @return {Promise}
    */
    async getCloseBtnContent(){
        return EGGY_ICONS.close;
    }


    /**
     * Add the mandatory styling to the page
     * 
     * @return {Promise}
    */
    async addStyling(){
        //If there is no page styling already
        if(!document.querySelector('.eggy-styles')){
            //Create the style tag
            let styles = document.createElement('style');
            //Add a class
            styles.classList.add('eggy-styles');
            //Populate it
            styles.textContent = EGGY_CSS;
            //Add to the head
            document.querySelector('head').appendChild(styles);
        }
        //Resolve
        return;
    }


    /**
     * Add the theme styling to the page
    */
    async addTheme(){
        //If there is no page styling already
        if(!document.querySelector('.eggy-theme') && this.options.styles){
            //Create the style tag
            let styles = document.createElement('style');
            //Add a class
            styles.classList.add('eggy-theme');
            //Populate it
            styles.textContent = EGGY_CSS_THEME;
            //Add to the head
            document.querySelector('head').appendChild(styles);
        }
        //Resolve
        return;
    }


    /**
     * Add a progress bar to a toast
     * 
     * @param {HTMLElement} toast - Toast we're adding a progress bar to
     * @return {Promise}
    */
    async addProgressBarToToast(toast){
        //Build our HTML
        let progressBar = document.createElement('span');
        //Get the duration
        let duration = this.options.duration / 1000;
        //Add our classes
        progressBar.classList.add('progress-bar');
        toast.appendChild(progressBar);
        //Add our styles
        if(this.options.styles){
            //Get the toasts id
            let toast_id = toast.getAttribute('id'),
                progressBarStyles = document.createElement('style');
            //Build the content
            progressBarStyles.textContent = `${EGGY_CSS_PROGRESS_BAR}#${toast_id} > .progress-bar { animation-duration: ${duration}s }`;
            toast.appendChild(progressBarStyles);
        }
        //Append it to the toast
        //Return the toast
        return toast;
    }


    /**
     * Build the default options
     * 
     * @param {Object} userOptions The user options for any overwrites
     * @return {Object} An object of options
    */
    buildDefaultOptions(userOptions){
        let options = {
            position: 'top-right',
            type: 'success',
            styles: true,
            duration: 5000,
            progressBar: true
        }
        //Get our type
        let type = (userOptions != undefined) ? userOptions.type ?? options.type : options.type;
        switch(type){
            case 'success':
                //Default titles and messages if not set in user options
                options.title = 'Success!';
                options.message = 'Task successfully completed.';
            break;
            case 'info':
                //Default titles and messages if not set in user options
                options.title = 'Information';
                options.message = 'Please take note of this information.';
            break;
            case 'warning':
                //Default titles and messages if not set in user options
                options.title = 'Warning';
                options.message = 'Please be careful!';
            break;
            case 'error':
                //Default titles and messages if not set in user options
                options.title = 'Whoops!';
                options.message = 'Something wen\'t wrong, please try again!';
            break;
        }
        //Return
        return options;
    }

}

//Expose Eggy on the global scope for plain script usage
window.Eggy = async (options) => {
    //Start a new Eggy Toast
    let newBuild = new Builder(options);
    //Run the build
    return await newBuild.create();
}