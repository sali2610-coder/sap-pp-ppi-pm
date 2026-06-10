import PptxGenJS from "pptxgenjs";
import * as fs from "fs/promises";
import * as path from "path";

export interface PresentationState {
  id: string;
  pres: any;
  createdAt: Date;
  slides: number;
}

export class PresentationManager {
  private presentations: Map<string, PresentationState> = new Map();

  createPresentation(id?: string): string {
    const presentationId = id || this.generateId();
    const pres = new (PptxGenJS as any)();

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

  getPresentation(id: string): any {
    const state = this.presentations.get(id);
    if (!state) {
      throw new Error(`Presentation with id '${id}' not found`);
    }
    return state.pres;
  }

  getPresentationState(id: string): PresentationState {
    const state = this.presentations.get(id);
    if (!state) {
      throw new Error(`Presentation with id '${id}' not found`);
    }
    return state;
  }

  updateSlideCount(id: string, count: number): void {
    const state = this.presentations.get(id);
    if (state) {
      state.slides = count;
    }
  }

  listPresentations(): Array<{ id: string; slides: number; createdAt: string }> {
    return Array.from(this.presentations.values()).map((state) => ({
      id: state.id,
      slides: state.slides,
      createdAt: state.createdAt.toISOString(),
    }));
  }

  deletePresentation(id: string): boolean {
    return this.presentations.delete(id);
  }

  async savePresentation(id: string, outputPath: string): Promise<string> {
    const pres = this.getPresentation(id);
    const resolvedPath = path.resolve(outputPath);
    await pres.writeFile({ fileName: resolvedPath });
    return resolvedPath;
  }

  private generateId(): string {
    return `pres_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
