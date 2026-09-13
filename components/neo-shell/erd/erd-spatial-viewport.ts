export interface SpatialCamera { scale: number; x: number; y: number }
export interface SpatialBounds { x: number; y: number; w: number; h: number }

// Fit the actual available diagram area, including after panels, fullscreen
// and resize. A minimum zoom floor would crop a large module on small screens.
export function fitSpatial(bounds: SpatialBounds, width: number, height: number): SpatialCamera {
  const padX = Math.min(32,width*.06), padY = Math.min(36,height*.08);
  const scale = Math.min(3,Math.max(1,width-padX*2)/Math.max(1,bounds.w),Math.max(1,height-padY*2)/Math.max(1,bounds.h));
  return {scale,x:(width-bounds.w*scale)/2-bounds.x*scale,y:(height-bounds.h*scale)/2-bounds.y*scale};
}
