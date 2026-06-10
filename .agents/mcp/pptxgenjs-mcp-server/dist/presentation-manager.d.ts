export interface PresentationState {
    id: string;
    pres: any;
    createdAt: Date;
    slides: number;
}
export declare class PresentationManager {
    private presentations;
    createPresentation(id?: string): string;
    getPresentation(id: string): any;
    getPresentationState(id: string): PresentationState;
    updateSlideCount(id: string, count: number): void;
    listPresentations(): Array<{
        id: string;
        slides: number;
        createdAt: string;
    }>;
    deletePresentation(id: string): boolean;
    savePresentation(id: string, outputPath: string): Promise<string>;
    private generateId;
}
//# sourceMappingURL=presentation-manager.d.ts.map