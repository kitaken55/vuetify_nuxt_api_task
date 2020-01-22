<template>
    <v-app>
        <v-card>
            <v-card-title>
            <h1 class="display-1">ログイン</h1>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field label="ユーザ名" v-model="text" />
                <p>{{ text }}</p>
                <v-text-field label="パスワード" />
            </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
export default {
    data: function() {
        return {
            text: ""
        }
    }
}
</script>