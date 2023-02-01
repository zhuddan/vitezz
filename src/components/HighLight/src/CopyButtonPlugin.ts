const locales = {
  en: ['Copy', 'Copied!', 'Copied to clipboard'],
  es: ['Copiar', 'Copiado!', 'Copiado al portapapeles'],
  fr: ['Copier', 'Copié!', 'Copié dans le presse-papier'],
  de: ['Kopieren', 'Kopiert!', 'In die Zwischenablage kopiert'],
  ja: ['コピー', 'コピーしました！', 'クリップボードにコピーしました'],
  ko: ['복사', '복사됨!', '클립보드에 복사됨'],
  ru: ['Копировать', 'Скопировано!', 'Скопировано в буфер обмена'],
  zh: ['复制', '已复制!', '已复制到剪贴板'],
  'zh-tw': ['複製', '已複製!', '已複製到剪貼簿'],
};

interface CopyButtonPluginOptions {
  hook?(text: string, el: HTMLElement): string;
  callback?(text: string, el: HTMLElement): void;
  lang?: keyof typeof locales;
}
export class CopyButtonPlugin {
  hook: ((text: string, el: HTMLElement) => string) | undefined;
  callback: ((text: string, el: HTMLElement) => void) | undefined;
  lang: keyof typeof locales;
  constructor(options: CopyButtonPluginOptions = {}) {
    this.hook = options.hook;
    this.callback = options.callback;
    this.lang = options.lang || document.documentElement.lang as keyof typeof locales || 'en';
  }

  'after:highlightElement'({ el, text }: { el: HTMLElement; text: string }) {
    console.log(123);
    const button = Object.assign(document.createElement('button'), {
      innerHTML: locales[this.lang]?.[0] || 'Copy',
      className: 'hljs-copy-button',
    });
    button.dataset.copied = false as any;
    console.log(el.parentElement);
    el.parentElement?.classList.add('hljs-copy-wrapper');
    el.parentElement?.appendChild(button);
    el.parentElement?.style.setProperty(
      '--hljs-theme-background',
      window.getComputedStyle(el).backgroundColor,
    );
    button.onclick = () => {
      if (!navigator.clipboard) return;
      let newText = text;
      if (this.hook && typeof this.hook === 'function') newText = this.hook(text, el) || text;
      navigator.clipboard
        .writeText(newText)
        .then(() => {
          button.innerHTML = locales[this.lang]?.[1] || 'Copied!';
          button.dataset.copied = true as any;
          let alert: Nullable<HTMLDivElement & {
            role: string;
            className: string;
            innerHTML: any;
          }> = Object.assign(document.createElement('div'), {
            role: 'status',
            className: 'hljs-copy-alert',
            innerHTML: locales[this.lang]?.[2] || 'Copied to clipboard',
          });
          el.parentElement?.appendChild(alert);
          setTimeout(() => {
            button.innerHTML = locales[this.lang]?.[0] || 'Copy';
            button.dataset.copied = false as any;
            el.parentElement?.removeChild(alert!);
            alert = null;
          }, 2e3);
        })
        .then(() => {
          if (typeof this.callback === 'function')
            return this.callback(newText, el);
        });
    };
  }
}
