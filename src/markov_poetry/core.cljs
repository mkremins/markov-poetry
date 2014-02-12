(ns markov-poetry.core
  (:require [clojure.string :refer [split]]))

(enable-console-print!)

(defn tokenize [text]
  (->> (split text #"[^\w'-]+") (map #(.toLowerCase %)) (into [])))

(defn markov-map [words]
  (let [pairs (->> words (partition 2 1) (map vec))]
    (reduce (fn [markov [word1 word2]]
              (update-in markov [word1 word2] (fnil inc 0)))
            {} pairs)))

(defn weighted-choice [slices]
  (->> slices
    (map (fn [[value weight]] (repeat weight value)))
    flatten vec rand-nth))

(defn markov-chain [start nexts]
  (loop [chain start
         last-word start]
    (if (> 10 (* 100 (rand)) 0)
      chain
      (let [next-word (weighted-choice (get nexts last-word))]
        (recur (str chain " " next-word) next-word)))))

(let [input  (.getElementById js/document "input")
      word   (.getElementById js/document "word")
      button (.getElementById js/document "button")
      output (.getElementById js/document "output")]
  (.addEventListener button "click"
                     (fn [_]
                       (let [mmap (markov-map (tokenize (.-value input)))]
                         (println (.-value input))
                         (println (tokenize (.-value input)))
                         (println mmap)
                         (set! (.-innerHTML output)
                               (markov-chain (.-value word) mmap))))))
