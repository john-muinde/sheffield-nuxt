// composables/useMarkdownFormatter.js
import { nextTick } from "vue";

export function useMarkdown() {
  const formatHeadings = (container) => {
    const h1 = container.querySelector("p strong");
    if (h1) {
      const headingsDiv = document.createElement("div");
      headingsDiv.className = "headings";
      const h3 = document.createElement("h3");
      h3.className = "heading text-primary";
      h3.textContent = h1.textContent;
      headingsDiv.appendChild(h3);
      h1.parentNode.replaceChild(headingsDiv, h1);
    }

    const h2s = container.querySelectorAll("h2");
    h2s.forEach((h2) => {
      const h4 = document.createElement("h4");
      h4.textContent = h2.textContent;
      h2.parentNode.replaceChild(h4, h2);
    });
  };

  const formatLists = (container) => {
    const uls = container.querySelectorAll("ul");
    uls.forEach((ul) => {
      ul.style.marginLeft = "20px";
      ul.classList.add("mt-2");
    });

    const ols = container.querySelectorAll("ol");
    ols.forEach((ol) => {
      ol.style.listStyleType = "lower-alpha";
      ol.style.marginLeft = "30px";
    });
  };

  const formatParagraphs = (container) => {
    const paragraphs = Array.from(container.querySelectorAll("p"));
    for (let i = 3; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      if (paragraph.querySelector("strong")) {
        continue;
      }
      paragraph.style.marginLeft = "20px";
    }
  };

  const formatMarkdownContent = async (container) => {
    await nextTick();
    if (!container) return;

    formatHeadings(container);
    formatLists(container);
    formatParagraphs(container);
  };

  return {
    formatMarkdownContent,
  };
}
