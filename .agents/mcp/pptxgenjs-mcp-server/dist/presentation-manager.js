import PptxGenJS from "pptxgenjs";
import * as path from "path";
export class PresentationManager {
    presentations = new Map();
    createPresentation(id) {
        const presentationId = id || this.generateId();
        const pres = new PptxGenJS();
        pres.author = "MCP PptxGenJS Server";
        pres.company = "MCP";
        pres.subject = "Generated via MCP";
        pres.title = "Presentation";
        this.presentations.set(presentationId, {
            id: presentationId,
            pres,
            createdAt: new Date(),
            slides: 0,
        });
        return presentationId;
    }
    getPresentation(id) {
        const state = this.presentations.get(id);
        if (!state) {
            throw new Error(`Presentation with id '${id}' not found`);
        }
        return state.pres;
    }
    getPresentationState(id) {
        const state = this.presentations.get(id);
        if (!state) {
            throw new Error(`Presentation with id '${id}' not found`);
        }
        return state;
    }
    updateSlideCount(id, count) {
        const state = this.presentations.get(id);
        if (state) {
            state.slides = count;
        }
    }
    listPresentations() {
        return Array.from(this.presentations.values()).map((state) => ({
            id: state.id,
            slides: state.slides,
            createdAt: state.createdAt.toISOString(),
        }));
    }
    deletePresentation(id) {
        return this.presentations.delete(id);
    }
    async savePresentation(id, outputPath) {
        const pres = this.getPresentation(id);
        const resolvedPath = path.resolve(outputPath);
        await pres.writeFile({ fileName: resolvedPath });
        return resolvedPath;
    }
    generateId() {
        return `pres_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
//# sourceMappingURL=presentation-manager.js.map