import { useNoteStore } from "@/stores/note";
import { watch } from "vue";


export function useLocalStorage() {
    const store = useNoteStore()
    const watcher = () => watch(store.$state, (state) => {
        localStorage.setItem('state', JSON.stringify(state))
    }, { deep: true })

    const hydrate = () => {
        try {
            const fromStorage = localStorage.getItem('state')
            store.$patch(JSON.parse(fromStorage))
          } catch (_error) { console.log(_error)}
    }
    
    return {
        watcher,
        hydrate
    }
}