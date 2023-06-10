import {create, createStore} from "zustand";
import exp from "constants";

interface SearchStore {
    filter:string
    setFilter: (val : string) => void;
}
const useSearch = create<SearchStore>((set,get) => ({
    filter:'',
    setFilter: (val:string) => {
        set ({filter: val})
    }
}))
export default useSearch;