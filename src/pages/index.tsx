import Head from 'next/head'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Coffee</title>
      </Head>

      <main>
        <section className={styles.headSection}>
          <div className={styles.headSectionContent}>
            <div>
              <h1>
                Make better coffee{' '}
                <img src="/icon-coffee.svg" alt="icon coffee" />
              </h1>
              <p>why learn how to blog?</p>
            </div>

            <img src="/head-ilustration.svg" alt="ilustration" />
          </div>
        </section>

        <section>
          <div className={styles.cardsSectionContent}>
            <a href="#" className={styles.cardLatest}>
              <div className={styles.cardLatestTexts}>
                <h2>long established</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that....
                </p>
                <div>
                  <p>May 20th 2020</p>
                  <strong>Read more</strong>
                </div>
              </div>

              <div className={styles.cardLatestImage}></div>
            </a>

            <div className={styles.cardsPanel}>
              <a href="#" className={styles.cardsPanelItem}>
                <div className={styles.cardPanelImage}></div>

                <div className={styles.cardPanelTexts}>
                  <h2>long established</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that....
                  </p>
                  <div>
                    <p>May 20th 2020</p>
                    <strong>Read more</strong>
                  </div>
                </div>
              </a>

              <a href="#" className={styles.cardsPanelItem}>
                <div className={styles.cardPanelImage2}></div>

                <div className={styles.cardPanelTexts}>
                  <h2>long established</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that....
                  </p>
                  <div>
                    <p>May 20th 2020</p>
                    <strong>Read more</strong>
                  </div>
                </div>
              </a>

              <a href="#" className={styles.cardsPanelItem}>
                <div className={styles.cardPanelImage3}></div>

                <div className={styles.cardPanelTexts}>
                  <h2>long established</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that....
                  </p>
                  <div>
                    <p>May 20th 2020</p>
                    <strong>Read more</strong>
                  </div>
                </div>
              </a>
            </div>

            <a href="#" className={styles.cardHighlight}>
              <div className={styles.cardHighlightTexts}>
                <h2>What is Lorem Ipsum?</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution...
                </p>
                <div>
                  <p>May 20</p>
                  <strong>Read more</strong>
                </div>
              </div>

              <div className={styles.cardHighlightImage}></div>
            </a>

            <div className={styles.btnContainer}>
              <button type="button">See more</button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
