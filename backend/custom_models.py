import numpy as np

class DecisionTree:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def _gini_impurity(self, y):
        classes = np.unique(y)
        impurity = 1.0
        for c in classes:
            p = np.sum(y == c) / len(y)
            impurity -= p ** 2
        return impurity

    def _best_split(self, X, y, feature_indices):
        best_gini = float('inf')
        best_feature = None
        best_threshold = None

        for feature in feature_indices:
            thresholds = np.unique(X[:, feature])
            for threshold in thresholds:
                left = X[:, feature] <= threshold
                right = ~left

                if len(y[left]) == 0 or len(y[right]) == 0:
                    continue

                gini_left = self._gini_impurity(y[left])
                gini_right = self._gini_impurity(y[right])
                weighted_gini = (len(y[left]) * gini_left + len(y[right]) * gini_right) / len(y)

                if weighted_gini < best_gini:
                    best_gini = weighted_gini
                    best_feature = feature
                    best_threshold = threshold

        return best_feature, best_threshold

    def _build_tree(self, X, y, depth=0):
        n_samples, n_features = X.shape
        n_classes = len(np.unique(y))

        if (depth == self.max_depth or n_samples < self.min_samples_split or n_classes == 1):
            return np.argmax(np.bincount(y))

        feature_indices = np.random.choice(n_features, int(np.sqrt(n_features)), replace=False)
        feature, threshold = self._best_split(X, y, feature_indices)

        if feature is None:
            return np.argmax(np.bincount(y))

        left_indices = X[:, feature] <= threshold
        right_indices = ~left_indices

        left_subtree = self._build_tree(X[left_indices], y[left_indices], depth + 1)
        right_subtree = self._build_tree(X[right_indices], y[right_indices], depth + 1)

        return {
            'feature': feature,
            'threshold': threshold,
            'left': left_subtree,
            'right': right_subtree
        }

    def fit(self, X, y):
        self.tree = self._build_tree(X.values, y.values)

    def _predict_sample(self, sample, tree):
        if isinstance(tree, dict):
            feature, threshold = tree['feature'], tree['threshold']
            if sample[feature] <= threshold:
                return self._predict_sample(sample, tree['left'])
            else:
                return self._predict_sample(sample, tree['right'])
        else:
            return tree

    def predict(self, X):
        return np.array([self._predict_sample(x, self.tree) for x in X.values])


class RandomForest:
    def __init__(self, n_estimators=10, max_depth=None, min_samples_split=2):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.trees = []

    def _bootstrap_sample(self, X, y):
        n_samples = X.shape[0]
        indices = np.random.choice(n_samples, n_samples, replace=True)
        return X.iloc[indices], y.iloc[indices]

    def fit(self, X, y):
        self.trees = []
        for _ in range(self.n_estimators):
            X_sample, y_sample = self._bootstrap_sample(X, y)
            tree = DecisionTree(max_depth=self.max_depth, min_samples_split=self.min_samples_split)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

    def predict(self, X):
        tree_preds = np.array([tree.predict(X) for tree in self.trees])
        return np.apply_along_axis(lambda x: np.bincount(x).argmax(), axis=0, arr=tree_preds)
