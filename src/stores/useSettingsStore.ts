import { Identifier } from "deepslate";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useDatapackStore } from "./useDatapackStore";

export const useSettingsStore = defineStore('settings', () => {
    const world_preset = ref(Identifier.create("normal"))
    const dimension = ref(Identifier.create("overworld"))
    const seed = ref(BigInt(0))
    const y = ref<number|"surface">("surface")

    const datapackStore = useDatapackStore()

    datapackStore.$subscribe(async () => {
        if ((await datapackStore.dimensions).findIndex((id) => id.equals(dimension.value)) === -1) {
            dimension.value = (await datapackStore.dimensions)[0]
        }

        if ((await datapackStore.world_presets).findIndex((id) => id.equals(world_preset.value)) === -1) {
            world_preset.value = (await datapackStore.world_presets)[0]
        }
    })


    return {world_preset, dimension, seed, y}
})