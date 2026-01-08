# Verification

## Goal

The mystery function should return an array of "ranks", where:

- There is one rank for each number in the input; and
- The rank is the number of unique values smaller than the input number.

So, for example:

```javascript
> mysteryFunction([1, 2, 3]);
[0, 1, 2]
```

Because:

- There are no unique values smaller than `1`;
- There is one unique value (`1`) smaller than `2`; and
- There are two unique values (`1` and `2`) smaller than `3`.

<details>

<summary>
Now you try one: what should we get for <code>[9, 1, 1]</code>?
</summary>

We should expect the output <code>[1, 0, 0]</code>, because:

<ul>
<li>There is one unique value (<code>1</code>) smaller than <code>9</code>; and</li>
<li>There are no unique values smaller than <code>1</code>.</li>
</ul>

</details>

<details>

<summary>
How about <code>[9, 9, 9]</code>?
</summary>

We should expect the output <code>[0, 0, 0]</code>, because:

<ul>
<li>There are no unique values smaller than <code>9</code>.</li>
</ul>

</details>
