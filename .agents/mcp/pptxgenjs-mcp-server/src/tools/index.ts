export const toolDefinitions = [
  {
    name: "create_presentation",
    description:
      "Create a new PowerPoint presentation. Returns a presentation ID that should be used for all subsequent operations.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Optional custom ID for the presentation. If not provided, one will be generated.",
        },
        title: {
          type: "string",
          description: "Title of the presentation",
        },
        author: {
          type: "string",
          description: "Author name",
        },
        subject: {
          type: "string",
          description: "Subject of the presentation",
        },
        company: {
          type: "string",
          description: "Company name",
        },
      },
    },
  },
  {
    name: "add_slide",
    description:
      "Add a new slide to an existing presentation. Returns the slide number.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        layout: {
          type: "string",
          description: "Layout name (e.g., 'LAYOUT_TITLE', 'LAYOUT_BLANK')",
        },
      },
      required: ["presentationId"],
    },
  },
  {
    name: "add_text",
    description:
      "Add text to a slide with various formatting options.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        slideNumber: {
          type: "number",
          description: "Slide number (1-based index)",
        },
        text: {
          type: "string",
          description: "The text content to add",
        },
        x: {
          type: "number",
          description: "X position in inches (default: 1)",
        },
        y: {
          type: "number",
          description: "Y position in inches (default: 1)",
        },
        w: {
          type: "number",
          description: "Width in inches (default: 8)",
        },
        h: {
          type: "number",
          description: "Height in inches (default: 1)",
        },
        fontSize: {
          type: "number",
          description: "Font size in points (default: 18)",
        },
        bold: {
          type: "boolean",
          description: "Bold text",
        },
        italic: {
          type: "boolean",
          description: "Italic text",
        },
        color: {
          type: "string",
          description: "Text color (hex format like '363636')",
        },
        align: {
          type: "string",
          description: "Text alignment (left, center, right, justify)",
        },
      },
      required: ["presentationId", "slideNumber", "text"],
    },
  },
  {
    name: "add_shape",
    description:
      "Add a shape to a slide (rectangle, circle, triangle, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        slideNumber: {
          type: "number",
          description: "Slide number (1-based index)",
        },
        shape: {
          type: "string",
          description: "Shape type (e.g., 'rect', 'ellipse', 'roundRect', 'triangle')",
        },
        x: {
          type: "number",
          description: "X position in inches",
        },
        y: {
          type: "number",
          description: "Y position in inches",
        },
        w: {
          type: "number",
          description: "Width in inches",
        },
        h: {
          type: "number",
          description: "Height in inches",
        },
        fill: {
          type: "string",
          description: "Fill color (hex format)",
        },
        line: {
          type: "string",
          description: "Line color (hex format)",
        },
        lineSize: {
          type: "number",
          description: "Line thickness in points",
        },
      },
      required: ["presentationId", "slideNumber", "shape", "x", "y", "w", "h"],
    },
  },
  {
    name: "add_image",
    description:
      "Add an image to a slide from a file path or URL.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        slideNumber: {
          type: "number",
          description: "Slide number (1-based index)",
        },
        path: {
          type: "string",
          description: "File path or URL to the image",
        },
        x: {
          type: "number",
          description: "X position in inches",
        },
        y: {
          type: "number",
          description: "Y position in inches",
        },
        w: {
          type: "number",
          description: "Width in inches",
        },
        h: {
          type: "number",
          description: "Height in inches",
        },
      },
      required: ["presentationId", "slideNumber", "path", "x", "y"],
    },
  },
  {
    name: "add_table",
    description:
      "Add a table to a slide with rows and columns of data.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        slideNumber: {
          type: "number",
          description: "Slide number (1-based index)",
        },
        rows: {
          type: "array",
          description: "Array of rows, where each row is an array of cell values",
          items: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        x: {
          type: "number",
          description: "X position in inches (default: 1)",
        },
        y: {
          type: "number",
          description: "Y position in inches (default: 1)",
        },
        w: {
          type: "number",
          description: "Width in inches (default: 8)",
        },
        h: {
          type: "number",
          description: "Height in inches (default: 4)",
        },
      },
      required: ["presentationId", "slideNumber", "rows"],
    },
  },
  {
    name: "add_chart",
    description:
      "Add a chart (bar, line, pie, etc.) to a slide with data.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        slideNumber: {
          type: "number",
          description: "Slide number (1-based index)",
        },
        chartType: {
          type: "string",
          description: "Chart type (bar, line, pie, doughnut, area, scatter)",
        },
        data: {
          type: "array",
          description: "Array of data series objects with name, labels, and values",
        },
        x: {
          type: "number",
          description: "X position in inches (default: 1)",
        },
        y: {
          type: "number",
          description: "Y position in inches (default: 1)",
        },
        w: {
          type: "number",
          description: "Width in inches (default: 8)",
        },
        h: {
          type: "number",
          description: "Height in inches (default: 4)",
        },
        title: {
          type: "string",
          description: "Chart title",
        },
      },
      required: ["presentationId", "slideNumber", "chartType", "data"],
    },
  },
  {
    name: "save_presentation",
    description:
      "Save the presentation to a file. Returns the full path where the file was saved.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        outputPath: {
          type: "string",
          description: "Output file path (e.g., './output/presentation.pptx')",
        },
      },
      required: ["presentationId", "outputPath"],
    },
  },
  {
    name: "list_presentations",
    description:
      "List all active presentations in memory with their IDs and metadata.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "delete_presentation",
    description:
      "Delete a presentation from memory.",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: {
          type: "string",
          description: "The ID of the presentation to delete",
        },
      },
      required: ["presentationId"],
    },
  },
];
