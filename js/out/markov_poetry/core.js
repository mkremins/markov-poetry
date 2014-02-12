// Compiled by ClojureScript 0.0-2138
goog.provide('markov_poetry.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
markov_poetry.core.tokenize = (function tokenize(text){return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__4750_SHARP_){return p1__4750_SHARP_.toLowerCase();
}),clojure.string.split.call(null,text,/[^\w'-]+/)));
});
/**
* Given a map `choices {outcome weight}`, returns a randomly chosen `outcome`
* (with the likelihood of a particular `outcome` being chosen proportionate
* to its assigned `weight`).
*/
markov_poetry.core.weighted_choice = (function weighted_choice(choices){return cljs.core.rand_nth.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,(function (p__4753){var vec__4754 = p__4753;var outcome = cljs.core.nth.call(null,vec__4754,0,null);var weight = cljs.core.nth.call(null,vec__4754,1,null);return cljs.core.repeat.call(null,weight,outcome);
}),choices)));
});
/**
* Given a seq of `words`, returns a map `nexts` such that `(get-in nexts
* [word1 word2])` returns the number of times `word1` is immediately followed
* by `word2` within `words`.
*/
markov_poetry.core.nexts_map = (function nexts_map(words){var pairs = cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,1,words));return cljs.core.reduce.call(null,(function (nexts,p__4757){var vec__4758 = p__4757;var word1 = cljs.core.nth.call(null,vec__4758,0,null);var word2 = cljs.core.nth.call(null,vec__4758,1,null);return cljs.core.update_in.call(null,nexts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [word1,word2], null),cljs.core.fnil.call(null,cljs.core.inc,0));
}),cljs.core.PersistentArrayMap.EMPTY,pairs);
});
/**
* Given a map `nexts {word next-word-freqs}` produced by `nexts-map`,
* generates a Markov chain with first word `seed`. If no `seed` is provided,
* the first word will be chosen at random from `(keys nexts)`.
*/
markov_poetry.core.markov_chain = (function() {
var markov_chain = null;
var markov_chain__1 = (function (nexts){return markov_chain.call(null,cljs.core.rand_nth.call(null,cljs.core.keys.call(null,nexts)),nexts);
});
var markov_chain__2 = (function (seed,nexts){var chain = seed;var prev_word = seed;while(true){
if(((10 > (100 * cljs.core.rand.call(null)))) && (((100 * cljs.core.rand.call(null)) > 0)))
{return chain;
} else
{var this_word = markov_poetry.core.weighted_choice.call(null,cljs.core.get.call(null,nexts,prev_word));{
var G__4759 = [cljs.core.str(chain),cljs.core.str(" "),cljs.core.str(this_word)].join('');
var G__4760 = this_word;
chain = G__4759;
prev_word = G__4760;
continue;
}
}
break;
}
});
markov_chain = function(seed,nexts){
switch(arguments.length){
case 1:
return markov_chain__1.call(this,seed);
case 2:
return markov_chain__2.call(this,seed,nexts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
markov_chain.cljs$core$IFn$_invoke$arity$1 = markov_chain__1;
markov_chain.cljs$core$IFn$_invoke$arity$2 = markov_chain__2;
return markov_chain;
})()
;
var input_4761 = document.getElementById("input");var button_4762 = document.getElementById("button");var output_4763 = document.getElementById("output");button_4762.addEventListener("click",(function (_){var nexts = markov_poetry.core.nexts_map.call(null,markov_poetry.core.tokenize.call(null,input_4761.value));return output_4763.innerHTML = markov_poetry.core.markov_chain.call(null,nexts);
}));
