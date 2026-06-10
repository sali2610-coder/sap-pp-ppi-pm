# PptxGenJS MCP Server

A production-ready Model Context Protocol (MCP) server that provides PowerPoint presentation creation capabilities through [PptxGenJS](https://gitbrent.github.io/PptxGenJS/). This allows any LLM to create, modify, and export PowerPoint presentations programmatically.

## Features

- **Create Presentations**: Generate new PowerPoint presentations with custom metadata
- **Manage Slides**: Add and organize slides with various layouts
- **Rich Content**: Add text, shapes, images, tables, and charts
- **Multiple Chart Types**: Support for bar, line, pie, doughnut, area, and scatter charts
- **Flexible Formatting**: Extensive formatting options for text, shapes, and other elements
- **File Export**: Save presentations to `.pptx` format
- **Session Management**: Maintain multiple presentations in memory simultaneously

## Installation

```bash
npm install
npm run build
```

## Usage

### Development Mode

Run the server in development mode with auto-reload:

```bash
npm run dev
```

### Production Mode

Build and run the compiled version:

```bash
npm run build
node dist/index.js
```

### MCP Inspector

Test the server using the MCP Inspector:

```bash
npm run inspector
```

## Available Tools

### 1. create_presentation
Create a new PowerPoint presentation.

**Parameters:**
- `id` (optional): Custom presentation ID
- `title` (optional): Presentation title
- `author` (optional): Author name
- `subject` (optional): Subject
- `company` (optional): Company name

**Returns:** Presentation ID for subsequent operations

### 2. add_slide
Add a new slide to a presentation.

**Parameters:**
- `presentationId` (required): The presentation ID
- `layout` (optional): Slide layout name

**Returns:** Slide number

### 3. add_text
Add text to a slide with formatting options.

**Parameters:**
- `presentationId` (required): The presentation ID
- `slideNumber` (required): Target slide (1-based)
- `text` (required): Text content
- `x`, `y`, `w`, `h`: Position and size in inches
- `fontSize`: Font size in points
- `bold`, `italic`: Text styling
- `color`: Text color (hex format)
- `align`: Text alignment (left, center, right, justify)

### 4. add_shape
Add shapes to slides.

**Parameters:**
- `presentationId` (required): The presentation ID
- `slideNumber` (required): Target slide
- `shape` (required): Shape type (rect, ellipse, roundRect, triangle, etc.)
- `x`, `y`, `w`, `h` (required): Position and size
- `fill`: Fill color (hex)
- `line`: Line color (hex)
- `lineSize`: Line thickness

### 5. add_image
Add images from file paths or URLs.

**Parameters:**
- `presentationId` (required): The presentation ID
- `slideNumber` (required): Target slide
- `path` (required): File path or URL
- `x`, `y` (required): Position
- `w`, `h` (optional): Dimensions

### 6. add_table
Add tables with data.

**Parameters:**
- `presentationId` (required): The presentation ID
- `slideNumber` (required): Target slide
- `rows` (required): 2D array of cell values
- `x`, `y`, `w`, `h`: Position and size

### 7. add_chart
Add charts with data visualization.

**Parameters:**
- `presentationId` (required): The presentation ID
- `slideNumber` (required): Target slide
- `chartType` (required): bar, line, pie, doughnut, area, scatter
- `data` (required): Array of data series
- `x`, `y`, `w`, `h`: Position and size
- `title`: Chart title

### 8. save_presentation
Save presentation to file.

**Parameters:**
- `presentationId` (required): The presentation ID
- `outputPath` (required): Output file path (e.g., './output.pptx')

**Returns:** Full file path

### 9. list_presentations
List all active presentations in memory.

**Returns:** Array of presentation metadata

### 10. delete_presentation
Remove a presentation from memory.

**Parameters:**
- `presentationId` (required): The presentation ID to delete

## Integration with Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "pptxgenjs": {
      "command": "node",
      "args": ["/path/to/pptxgenjs-mcp-server/dist/index.js"]
    }
  }
}
```

## Example Workflow

```typescript
// 1. Create a presentation
const { presentationId } = await create_presentation({
  title: "Q4 Business Review",
  author: "John Doe",
  company: "Acme Corp"
});

// 2. Add a title slide
await add_slide({ presentationId });
await add_text({
  presentationId,
  slideNumber: 1,
  text: "Q4 Business Review",
  x: 1,
  y: 2,
  w: 8,
  h: 1,
  fontSize: 44,
  bold: true,
  align: "center"
});

// 3. Add a slide with a chart
await add_slide({ presentationId });
await add_chart({
  presentationId,
  slideNumber: 2,
  chartType: "bar",
  data: [
    {
      name: "Revenue",
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [100, 120, 140, 160]
    }
  ],
  title: "Quarterly Revenue"
});

// 4. Save the presentation
await save_presentation({
  presentationId,
  outputPath: "./Q4-Review.pptx"
});
```

## Architecture

- **index.ts**: MCP server entry point with request handlers
- **presentation-manager.ts**: Manages presentation lifecycle and state
- **tool-handler.ts**: Implements tool execution logic
- **tools/index.ts**: Tool definitions and schemas

## Requirements

- Node.js >= 18.0.0
- TypeScript 5.x
- MCP SDK 1.x
- PptxGenJS 4.x

## License

ISC

## Contributing

Contributions are welcome! Please ensure all changes maintain backward compatibility and include appropriate tests.
