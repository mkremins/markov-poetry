(ns markov-poetry.core
  (:require [clojure.string :refer [split]]))

(enable-console-print!)

(defn tokenize [text]
  (->> (split text #"[^\w'-]+") (map #(.toLowerCase %)) (into [])))

(defn weighted-choice
  "Given a map `choices {outcome weight}`, returns a randomly chosen `outcome`
   (with the likelihood of a particular `outcome` being chosen proportionate
   to its assigned `weight`)."
  [choices]
  (->> choices
    (map (fn [[outcome weight]] (repeat weight outcome)))
    (apply concat)
    (rand-nth)))

(defn nexts-map
  "Given a seq of `words`, returns a map `nexts` such that `(get-in nexts
   [word1 word2])` returns the number of times `word1` is immediately followed
   by `word2` within `words`."
  [words]
  (let [pairs (->> words (partition 2 1) (map vec))]
    (reduce (fn [nexts [word1 word2]]
              (update-in nexts [word1 word2] (fnil inc 0)))
            {} pairs)))

(defn markov-chain
  "Given a map `nexts {word next-word-freqs}` produced by `nexts-map`,
   generates a Markov chain with first word `seed`. If no `seed` is provided,
   the first word will be chosen at random from `(keys nexts)`."
  ([nexts]
    (markov-chain (rand-nth (keys nexts)) nexts))
  ([seed nexts]
    (loop [chain seed
           prev-word seed]
      (if (> 10 (* 100 (rand)) 0)
        chain
        (let [this-word (weighted-choice (get nexts prev-word))]
          (recur (str chain " " this-word) this-word))))))

(let [input  (.getElementById js/document "input")
      button (.getElementById js/document "button")
      output (.getElementById js/document "output")]
  (.addEventListener button "click"
                     (fn [_]
                       (let [nexts (nexts-map (tokenize (.-value input)))]
                         (set! (.-innerHTML output)
                               (markov-chain nexts))))))
