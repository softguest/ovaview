import {
  DecoratorNode,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import * as React from "react";

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
  },
  SerializedLexicalNode
>;

function ImageComponent({ src, altText }: { src: string; altText: string }) {
  return <img src={src} alt={altText} className="max-w-full rounded" />;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText } = serializedNode;
    return new ImageNode(src, altText);
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
    };
  }

  constructor(src: string, altText: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    return { element };
  }

  decorate(): JSX.Element {
    return <ImageComponent src={this.__src} altText={this.__altText} />;
  }
}

export function $createImageNode(src: string, altText: string): ImageNode {
  return new ImageNode(src, altText);
}

export function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}
