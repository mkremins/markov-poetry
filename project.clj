(defproject markov-poetry "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"

  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2138"]]

  :plugins [[lein-cljsbuild "1.0.2"]]

  :source-paths ["src"]

  :cljsbuild { 
    :builds [{:source-paths ["src"]
              :compiler {
                :output-to "js/markov.js"
                :output-dir "js/out"
                :optimizations :whitespace
                :source-map "js/markov.js.map"}}]})
