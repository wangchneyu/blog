"use client";

import styles from "./PrintButton.module.css";

/** 唤起浏览器打印对话框，用户可选择「另存为 PDF」。打印时按钮自身隐藏。 */
export function PrintButton() {
  return (
    <button type="button" className={styles.button} onClick={() => window.print()}>
      打印 / 存为 PDF
    </button>
  );
}
