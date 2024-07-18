<script setup lang="ts"></script>

<template>
	<footer class="footer">
		<div class="wrapper">
			<ul class="socials">
				<li>
					<a
						title="Go to my VK profile"
						target="_blank"
						href="https://vk.com/qaddis"
					>
						<svg><use xlink:href="#vk-svg"></use></svg>
					</a>
				</li>
				<li>
					<a
						title="Go to my Telegram profile"
						target="_blank"
						href="https://t.me/qaddis"
					>
						<svg><use xlink:href="#telegram-svg"></use></svg>
					</a>
				</li>
				<li>
					<a
						title="Go to the project repository"
						target="_blank"
						href="https://github.com/Qaddis"
					>
						<svg><use xlink:href="#github-svg"></use></svg>
					</a>
				</li>
			</ul>

			<p class="copyright">© 2024 Svyatoslav "Qaddis" Barsukov</p>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.footer {
	width: 100%;
	padding: 0 25px;
	background-color: var(--dark);
	border-top: 3px solid var(--add);
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;
	padding: 50px 0 25px;
}

.socials {
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 35px;

	li {
		border-radius: 50%;
		transition-property: opacity, translate;
		transition-duration: 0.35s;

		svg {
			width: 80px;
			height: 80px;
			fill: var(--light);
			transition: fill 0.25s;
		}

		&:active {
			opacity: 0.75;
			translate: 0 2px;
		}

		&:hover {
			svg {
				fill: var(--violet);
			}
		}
	}
}

.copyright {
	font-size: 1.1rem;
	text-align: center;
	color: var(--light);
	margin-top: 10px;
}
</style>
