export const loadStorage = ({key, isJSON = true})=>{
    try {
        const data  = window.localStorage.getItem(key);
        if ( data === null){
            return data;
        }

        if (isJSON){
            return JSON.parse(data);
        }

        return data;
    } catch (error) {
        return null;
    }
};

export const saveStorage = ({key, data, isJSON = true })=>{
    try {
        if (data === null){
            window.localStorage.removeItem(key);
            return;
        }

        if (isJSON){
            const stringifiedData = JSON.stringify(data);
            window.localStorage.setItem(key, stringifiedData);
            return;
        }

        window.localStorage.setItem(key, data);
    } catch (error) {
       console.error(error);
    }
};

export const deleteStorage = ( {key} )=>{
    try {
        saveStorage( {key , data: null} );
    } catch (error) {
       console.error(error);
    }
};