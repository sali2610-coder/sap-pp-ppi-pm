import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { PresentationManager } from "./presentation-manager.js";
import PptxGenJS from "pptxgenjs";

export async function handleToolCall(
  request: CallToolRequest,
  manager: PresentationManager
) {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "create_presentation":
        return handleCreatePresentation(args, manager);

      case "add_slide":
        return handleAddSlide(args, manager);

      case "add_text":
        return handleAddText(args, manager);

      case "add_shape":
        return handleAddShape(args, manager);

      case "add_image":
        return handleAddImage(args, manager);

      case "add_table":
        return handleAddTable(args, manager);

      case "add_chart":
        return handleAddChart(args, manager);

      case "save_presentation":
        return await handleSavePresentation(args, manager);

      case "list_presentations":
        return handleListPresentations(manager);

      case "delete_presentation":
        return handleDeletePresentation(args, manager);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}

function handleCreatePresentation(args: any, manager: PresentationManager) {
  const id = manager.createPresentation(args.id);
  const pres = manager.getPresentation(id);

  if (args.title) pres.title = args.title;
  if (args.author) pres.author = args.author;
  if (args.subject) pres.subject = args.subject;
  if (args.company) pres.company = args.company;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          presentationId: id,
          message: "Presentation created successfully",
        }),
      },
    ],
  };
}

function handleAddSlide(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slide = pres.addSlide(args.layout);
  const state = manager.getPresentationState(args.presentationId);
  const slideNumber = state.slides + 1;
  manager.updateSlideCount(args.presentationId, slideNumber);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          slideNumber,
          message: `Slide ${slideNumber} added successfully`,
        }),
      },
    ],
  };
}

function handleAddText(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slides = pres.slides;

  if (!slides || args.slideNumber < 1 || args.slideNumber > slides.length) {
    throw new Error(`Invalid slide number: ${args.slideNumber}`);
  }

  const slide = slides[args.slideNumber - 1];

  const options: any = {
    x: args.x ?? 1,
    y: args.y ?? 1,
    w: args.w ?? 8,
    h: args.h ?? 1,
    fontSize: args.fontSize ?? 18,
  };

  if (args.bold !== undefined) options.bold = args.bold;
  if (args.italic !== undefined) options.italic = args.italic;
  if (args.color) options.color = args.color;
  if (args.align) options.align = args.align;

  slide.addText(args.text, options);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Text added to slide ${args.slideNumber}`,
        }),
      },
    ],
  };
}

function handleAddShape(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slides = pres.slides;

  if (!slides || args.slideNumber < 1 || args.slideNumber > slides.length) {
    throw new Error(`Invalid slide number: ${args.slideNumber}`);
  }

  const slide = slides[args.slideNumber - 1];

  const options: any = {
    x: args.x,
    y: args.y,
    w: args.w,
    h: args.h,
  };

  if (args.fill) options.fill = { color: args.fill };
  if (args.line) options.line = { color: args.line };
  if (args.lineSize) options.line = { ...options.line, width: args.lineSize };

  slide.addShape(pres.shapes[args.shape.toUpperCase()] || args.shape, options);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Shape added to slide ${args.slideNumber}`,
        }),
      },
    ],
  };
}

function handleAddImage(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slides = pres.slides;

  if (!slides || args.slideNumber < 1 || args.slideNumber > slides.length) {
    throw new Error(`Invalid slide number: ${args.slideNumber}`);
  }

  const slide = slides[args.slideNumber - 1];

  const options: any = {
    path: args.path,
    x: args.x,
    y: args.y,
  };

  if (args.w) options.w = args.w;
  if (args.h) options.h = args.h;

  slide.addImage(options);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Image added to slide ${args.slideNumber}`,
        }),
      },
    ],
  };
}

function handleAddTable(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slides = pres.slides;

  if (!slides || args.slideNumber < 1 || args.slideNumber > slides.length) {
    throw new Error(`Invalid slide number: ${args.slideNumber}`);
  }

  const slide = slides[args.slideNumber - 1];

  const options: any = {
    x: args.x ?? 1,
    y: args.y ?? 1,
    w: args.w ?? 8,
    h: args.h ?? 4,
  };

  slide.addTable(args.rows, options);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Table added to slide ${args.slideNumber}`,
        }),
      },
    ],
  };
}

function handleAddChart(args: any, manager: PresentationManager) {
  const pres = manager.getPresentation(args.presentationId);
  const slides = pres.slides;

  if (!slides || args.slideNumber < 1 || args.slideNumber > slides.length) {
    throw new Error(`Invalid slide number: ${args.slideNumber}`);
  }

  const slide = slides[args.slideNumber - 1];

  const options: any = {
    x: args.x ?? 1,
    y: args.y ?? 1,
    w: args.w ?? 8,
    h: args.h ?? 4,
    chartType: args.chartType,
  };

  if (args.title) options.title = args.title;

  slide.addChart(pres.charts[args.chartType.toUpperCase()] || args.chartType, args.data, options);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Chart added to slide ${args.slideNumber}`,
        }),
      },
    ],
  };
}

async function handleSavePresentation(args: any, manager: PresentationManager) {
  const filePath = await manager.savePresentation(
    args.presentationId,
    args.outputPath
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          filePath,
          message: "Presentation saved successfully",
        }),
      },
    ],
  };
}

function handleListPresentations(manager: PresentationManager) {
  const presentations = manager.listPresentations();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          presentations,
          count: presentations.length,
        }),
      },
    ],
  };
}

function handleDeletePresentation(args: any, manager: PresentationManager) {
  const deleted = manager.deletePresentation(args.presentationId);

  if (!deleted) {
    throw new Error(`Presentation ${args.presentationId} not found`);
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          success: true,
          message: "Presentation deleted successfully",
        }),
      },
    ],
  };
}
