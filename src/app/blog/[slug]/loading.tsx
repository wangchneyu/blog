import styles from "./loading.module.css";

// 确定性的宽度序列，避免每次渲染抖动
const LINE_WIDTHS = [92, 85, 96, 78, 90, 84];
const LINE_WIDTHS_2 = [74, 95, 82, 88, 70, 91];

export default function BlogPostLoading() {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loadingInner}>
        {/* Back link skeleton */}
        <div className={`${styles.skeleton} ${styles.backLinkSkeleton}`} />

        {/* Title skeleton */}
        <div className={`${styles.skeleton} ${styles.titleSkeleton}`} style={{ width: "80%" }} />
        <div className={`${styles.skeleton} ${styles.titleSkeleton} ${styles.titleSkeletonShort}`} />

        {/* Content skeleton lines */}
        {LINE_WIDTHS.map((width, i) => (
          <div
            key={i}
            className={`${styles.skeleton} ${styles.lineSkeleton}`}
            style={{ width: `${width}%` }}
          />
        ))}

        <div className={styles.gap} />

        {LINE_WIDTHS_2.map((width, i) => (
          <div
            key={i}
            className={`${styles.skeleton} ${styles.lineSkeleton}`}
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  );
}
