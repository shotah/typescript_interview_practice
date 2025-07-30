// 1268. Search Suggestions System
// https://leetcode.com/problems/search-suggestions-system/
// You are given an array of strings products and a string searchWord.
// We want to design a system that suggests at most three product names from products after each character of searchWord is typed.
// Suggested products should have common prefix with the searchWord.
// If there are more than three products with a common prefix, return the three lexicographically smallest ones.
// Return a list of lists of the suggested products after each character of searchWord is typed
class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEnd = false;
  }
}

class Trie {
  wordStorage: Set<string>;
  constructor() {
    this.wordStorage = new Set();
  }

  insert(word: string): void {
    this.wordStorage.add(word);
  }

  search(word: string): boolean {
    return this.wordStorage.has(word);
  }

  startsWith(prefix: string): boolean {
    for (const word of this.wordStorage) {
      if (word.startsWith(prefix)) return true;
    }
    return false;
  }

  getSuggestions(prefix: string): string[] {
    const suggestions: string[] = [];
    for (const word of this.wordStorage) {
      if (word.startsWith(prefix)) {
        suggestions.push(word);
      }
    }
    return suggestions.sort().slice(0, 3); // Return up to 3 suggestions sorted lexicographically
  }
}
function suggestedProducts(products: string[], searchWord: string): string[][] {
  const trie = new Trie();
  for (const product of products) {
    trie.insert(product);
  }

  const result: string[][] = [];
  let prefix = '';

  for (const char of searchWord) {
    prefix += char;
    const suggestions = trie.getSuggestions(prefix);
    result.push(suggestions);
  }

  return result;
}

import {assert} from 'chai';
let n: string[];
let output: string[][];
n = ['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'];
output = [
  ['mobile', 'moneypot', 'monitor'],
  ['mobile', 'moneypot', 'monitor'],
  ['mouse', 'moneypot', 'monitor'],
  ['mouse', 'moneypot', 'monitor'],
  ['mousepad'],
];
assert.deepEqual(suggestedProducts(n, 'mouse'), output);
